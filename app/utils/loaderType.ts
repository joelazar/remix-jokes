type Awaited<T> = T extends Promise<infer U> ? U : T;
type LoaderData = Awaited<ReturnType<typeof loader>>;
