type AppendArgument<Fn, A> = Fn extends (...args: infer Args) => infer Res
  ? (...args: [...Args, A]) => Res
  : Fn;
