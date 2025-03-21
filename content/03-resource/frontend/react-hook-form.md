---
title: react hook form
date: 2021-05-07 14:05:26
category: frontend
tags: ['React', 'react hook form']
draft: true
---

- 버전 6을 프로젝트에 도입했는데 7버전으로 올라가 있어서 문서와 프로젝트에서의 동작이 맞지 않았습니다...ㅠ

## Uncontrolled Component

```jsx
const BasicInformationFormGroup = (
  _,
  ref: Ref<{ values: BasicInfoFields }>,
) => {
  const nameRef = (useRef < HTMLInputElement) | (null > null);
  const aboutMeRef = (useRef < HTMLInputElement) | (null > null);
  const phoneNumberRef = (useRef < HTMLInputElement) | (null > null);

  useImperativeHandle(
    ref,
    () => ({
      get values() {
        return {
          name: nameRef.current?.value,
          aboutMe: nameRef.current?.value,
          phoneNumber: phoneNumberRef.current?.value,
        };
      },
    }),
    [],
  );

  return (
    <>
      <Input ref={nameRef} name="이름" />
      <Input ref={aboutMeRef} name="내소개" />
      <Input ref={phoneNumberRef} name="이름" />
    </>
  );
};
```

- useImperativeHandle의 두 번째 인자는 함수인데, 이때 Closure가 생성되며 값이 캡쳐링 됩니다. getter를 통해서 함수 반환되도록 하고, values를 참조하는 시점에 getter 함수가 호출되도록 하여 캡쳐링으로 인한 오류를 방지할 수 있습니다.

## Uncontrolled Component를 고려하기 어려운 상황들

- onChange 시점의 유효성 검사 결과에 따라 특정 로직을 수행해야 하는 경우
- 많은 form이 서로의 값에 의존적인 경우

## react-hook-form

- react-hook-form은 form을 Uncontrolled방식으로 쉽게 다룰 수 있도록 지원하는 라이브러리입니다.
- react-hook-form의 동작방식은 HTML Element를 내부 ref로 관리하는 방식입니다.

### 설정값 살펴보기

#### mode

- 어느 시점부터 입력값 유효성 검사를 시작할지 설정합니다. 기본값은 onSubmit으로 폼 입력값을 제출한 후부터 입력값 유효성 검사를 시작합니다.

#### reValidateMode

- 언제마다 입력값 유효성을 검사할지 설정합니다. 위의 mode 시점 이후에 수행됩니다.

#### defaultValues

- input에 설정될 기본값을 설정합니다.
- 컴포넌트가 마운트될 때만 설정됩니다.
- 기본값을 '', null 등으로 설정하는 것을 권장합니다.
- 현재 입력값을 기본값으로 바꾸고 싶으면 reset API를 사용합니다.
- 이 값은 watch 함수의 기본값(2밴째 인수)으로 설정됩니다.

#### register

- watch 함수 작동 하지 않습니다. 해당 입력창에 설정된 초기값만 불러옵니다.

### Controller

- blur 시에 서버 데이터에서 값 검증 후 에러 메시지 노출하는 곳에 사용하려고 했으나 포커싱이 제대로 되지 않고 큰 이점을 찾지 못해 외부 라이브러리를 써야하는 시점이 아니라면 정확히 어디에 써야하는지 잘 모르곘습니다.

#### useForm과의 차이

- useForm은 ref를 이용한 uncontrolled 모드
- Controller는 state를 이용한 controlled 모드

### input이 동적으로 추가되는 경우

- 입력할 수 있는 input이 동적으로 늘어나는 경우도 있습니다. ref를 전달하여 값에 접근한다면 field의 개수가 늘어날 때마다 ref를 생성해 주어야 하는데, 늘어날 값이 정해져 있지 않다면 불가능합니다. form의 개수가 늘어날 때마다 ID를 부여하고 데이터를 Map 구조로 다뤄야합니다.
- useFieldArray를 사용해서 간단하게 해결할 수 있습니다.

```jsx
const FIELD_NAME = 'test';
const ArrayForm = () => {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: FIELD_NAME,
    },
  );

  return (
    <>
      {fields.map((field, index) => (
        <input
          key={field.id}
          name={`${FIELD_NAME}[${index}].value`}
          ref={register()}
          defaultValue={field.value}
        />
      ))}
    </>
  );
};
```

### onChange 시점의 값에 따라 특정 로직을 수행해야 하는 경우

```jsx
const WatchedInput = () => {
  const { register, watch, errors, handleSubmit } = useForm();
  const watchShowAge = watch('showAge', false); // false: defaultValue

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="checkbox" name="showAge" ref={register} />

      {watchShowAge && (
        <input type="number" name="age" ref={register({ min: 50 })} />
      )}
      <input type="submit" />
    </form>
  );
};
```

### 많은 form이 서로의 값에 의존적인 경우

- 각 form이 서로의 값에 의존적인 경우 Component를 나누기 어렵고 이를 하나의 파일에서 처리하면 책임이 집중되고 props drilling이 심해집니다. 지금은 하나의 참조여서 간단하게 해결할 수도 있지만, 컴포넌트가 깊게 중첩되어야 할수록 관리가 어렵습니다. 이런 상황은 FormContext를 사용하면 쉽게 해결할 수 있습니다.

```jsx
const ParentForm = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <기본정보 />
      <급여정보 />
    </FormProvider>
  );
};

const 계좌정보 = () => {
  const { getValues } = useFormContext();

  return (
    <급여계좌번호>
      <계좌실명인증
        onClick={() => {
          validateAccount(은행명, 계좌번호, getValues('주민등록번호'));
        }}
      />
    </급여계좌번호>
  );
};
```

### react hook form에서 blur 시 서버 에러 확인

- 기본적으로 블러 시 에러를 체크하지만 특정 input만 실시간 에러 체크와 블러 시 서버 에러를 체크하는 방법
- input 변경 시 서버 에러는 삭제
- 기본 에러 체크에서 걸릴 시에 서버 에러는 체크하지 않음

```tsx
const App: React.VFC = () => {
  const { register, handleSubmit, errors, getValues, trigger } =
    useForm<IFormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const blurError = useRef({ id: '', password: '' });
  const checkId = async (value: string) => {
    if (
      errors['id']?.message &&
      errors['id']?.message !== blurError.current.id
    ) {
      return;
    }
    try {
      if (value) {
        await api.idCheck(value);
      }
      blurError.current.id = '';
    } catch (e) {
      blurError.current.id =
        '이미 사용중인 아이디 입니다. 다른 아이디를 입력해주세요.';
    } finally {
      trigger('id');
    }
  };
  const checkPassword = async (value: string) => {
    if (
      errors['password']?.message &&
      errors['password']?.message !== blurError.current.password
    ) {
      return;
    }
    try {
      if (value) {
        await api.checkPassword({
          password: value,
        });
      }
      blurError.current.password = '';
    } catch (e) {
      blurError.current.password = e;
    } finally {
      trigger('password');
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await api.submit();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await checkId(getValues('id'));
        await checkPassword(getValues('password'));
        handleSubmit(onSubmit)(event);
      }}
    >
      <Input
        label="아이디"
        name="id"
        register={register({
          required: '아이디를 입력하세요.',
          pattern: {
            value: /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/i,
            message:
              '영문 혹은 영문과 숫자를 조합하여 4자~20자로 입력해주세요.',
          },
          minLength: {
            value: 4,
            message:
              '영문 혹은 영문과 숫자를 조합하여 4자~20자로 입력해주세요.',
          },
          maxLength: {
            value: 20,
            message:
              '영문 혹은 영문과 숫자를 조합하여 4자~20자로 입력해주세요.',
          },
          validate: {
            hasError: () => {
              return !blurError.current.id || blurError.current.id;
            },
          },
        })}
        onChange={(e) => {
          trigger('id');
          blurError.current.id = '';
        }}
        onBlur={async (e) => {
          checkId(e.currentTarget.value);
        }}
        placeholder="영문 혹은 영문+숫자, 4~20자"
        errorMessage={errors['id']?.message}
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        register={register({
          required: '비밀번호를 입력해주세요.',
          minLength: {
            value: 8,
            message: '영문과 숫자를 포함하여 8~20자로 입력해주세요.',
          },
          maxLength: {
            value: 20,
            message: '영문과 숫자를 포함하여 8~20자로 입력해주세요.',
          },
          validate: {
            useCharacter: (value: string) => {
              const num = value.search(/[0-9]/g);
              const eng = value.search(/[a-z]/gi);
              return (
                !(num < 0 || eng < 0) ||
                '영문과 숫자를 포함하여 8~20자로 입력해주세요.'
              );
            },
            specialCharacter: (value: string) => {
              return (
                value.match(/^[A-Za-z0-9!@#$%^&*()\-_=+]*$/) ||
                '특수문자는 !@#$%^&*()-_=+ 만 입력 가능합니다.'
              );
            },
            includeID: (value: string) => {
              const id = getValues('id');
              if (!id) {
                return;
              }
              return (
                !value.includes(id) ||
                '아이디를 포함한 비밀번호는 사용할 수 없습니다.'
              );
            },
            hasError: () => {
              return !blurError.current.password || blurError.current.password;
            },
          },
        })}
        onChange={(e) => {
          blurError.current.password = '';
          trigger('password');
        }}
        onBlur={async (e) => {
          const value = e.currentTarget.value;
          await checkPassword(value);
        }}
        placeholder="영문+숫자 혹은 영문+숫자+특수문자, 8~20자"
        errorMessage={errors['password']?.message}
      />
      <button type="submit">완료</button>
    </form>
  );
};

export default App;
```

---

## 참고

- [입력을 다루는 다양한 방법](https://so-so.dev/react/form-handling/)
- [react-hook-form 톺아보기 #53](https://github.com/SoYoung210/soso-tip/issues/53)
- [React Hook Form](https://velog.io/@gwak2837/React-Hook-Form)
