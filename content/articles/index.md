# Заголовок статьи первого уровня

## Заголовок второго уровня

### Заголовок третьего уровня

#### Заголовок четвертого уровня

Просто текст обычного параграфа. Можно писать многострочный текст, но нужно соблюдать отступы и переносы строк.

> Цитата с важной информацией.  
> Можно делать многострочные цитаты, добавляя `>` перед каждой новой строкой.

_Курсивное начертание_ и **жирный текст** работают корректно.

## Ссылки

- [Внешняя ссылка (Google)](https://google.com){target="_blank" rel="noopener noreferrer"}
- [Внутренняя ссылка на статьи](/articles)

## Блоки кода с подсветкой

```ts [example.ts]
const greeting: string = "World";
console.log(`Hello ${greeting}`);
```

```ts [file.ts]
const a: string = "World";
console.log(`Hello ${a}`);
```

```bash
npm run dev
# or
bun run dev
```

```yml [index.yaml]
config:
  some: "hi"
```

```md [index.md]
Hello [World]{style="color: green;" .custom-class #custom-id}! Hello [World]{style="color: green;" .custom-class #custom-id}!
```

```python [index.py]
print('Hello world')
```

```c [index.c]
print('Hello world')
```

```cpp [index.cpp]
print('Hello world')
```

```csharp [index.csharp]
print('Hello world')
```

```txt [data.txt]
some text here
```

Если нет файла, то header у блока кода не будет
```
some code like text here
```

Внутри текста кусок кода `const code: string = 'highlighted code inline'` с подсветкой синтаксиса

![A Pinguin Image long string super long string super super long string](/images/main-page/pinguin.jpg)
