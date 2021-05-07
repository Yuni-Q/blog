---
title: react hook form에서 blur 시 서버 에러 확인
date: 2021-05-07 14:05:26
category: frontend
tags: []
draft: true
---

- 기본적으로 블러 시 에러를 체크하지만 특정 input만 실시간 에러 체크와 블러 시 서버 에러를 체크하는 방법
- input 변경 시 서버 에러는 삭제
- 기본 에러 체크에서 걸릴 시에 서버 에러는 체크하지 않음

```tsx
const App: React.VFC = () => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    trigger,
  } = useForm<IFormValues>({ mode: 'onBlur', reValidateMode: 'onBlur' });
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
