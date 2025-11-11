
## 🧠 What is a Custom Hook?

A **custom hook** is simply a **function that starts with `use`** and **uses one or more built-in React hooks** inside it.

It lets you **extract and reuse logic** (like fetching data, managing forms, local storage, timers, etc.)
so your components stay **clean and focused on UI**.

---

### ⚙️ Syntax

```js
function useSomething() {
  // use built-in hooks here (useState, useEffect, etc.)
  return ...;
}
```

> 🔸 Always start with `use` — that’s how React knows it’s a hook and must follow React’s hook rules.

---

## 🧩 Why Create Custom Hooks?

Imagine you have two components that both:

* fetch data from an API
* store it in state
* show loading/error

Instead of copying the same code twice, you **extract** it into a custom hook and reuse it.

---

## 🧪 Example 1: A Simple `useFetch` Hook

### ✅ Without Custom Hook (repetitive)

```jsx
function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

Now if another component (e.g., `Posts`) needs the same logic, you’d duplicate it.
That’s where custom hooks shine 👇

---

### ✅ With Custom Hook

#### Step 1: Create `useFetch.js`

```jsx
import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

#### Step 2: Use it in any component

```jsx
import { useFetch } from "./useFetch";

function Users() {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

✅ Done! — You can reuse `useFetch()` anywhere with just one line.

---

## 🧩 Example 2: `useLocalStorage` Hook (Persist data)

Let’s say you want to save data in `localStorage` (like a theme or todo list).

```jsx
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

**Usage:**

```jsx
const [theme, setTheme] = useLocalStorage("theme", "light");
```

Now the theme will stay saved even after refreshing the browser.

---

## 🧩 Example 3: `useToggle` Hook (Simple state logic)

```jsx
import { useState } from "react";

export function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);
  const toggle = () => setState(prev => !prev);
  return [state, toggle];
}
```

**Usage:**

```jsx
const [isVisible, toggleVisible] = useToggle();

<button onClick={toggleVisible}>Toggle</button>
{isVisible && <p>Now you see me!</p>}
```

---

## 🧠 Rules for Creating Custom Hooks

1. ✅ **Always start the name with `use`**

   * So React knows it’s a hook and enforces hook rules.

2. ✅ **Use only inside React function components or other hooks**

   * You can’t call hooks inside regular JS functions.

3. ✅ **Can return anything**

   * Values, functions, arrays, or even JSX (though that’s rare).

4. ✅ **Follow single responsibility**

   * Each hook should focus on *one job* (fetch, toggle, localStorage, etc.).

---

## 🧾 Summary

| Concept             | Description                            | Example                    |
| ------------------- | -------------------------------------- | -------------------------- |
| `useFetch()`        | Handles API fetching + loading + error | Fetch data anywhere easily |
| `useLocalStorage()` | Saves data in browser localStorage     | Persist theme, todos, etc. |
| `useToggle()`       | Toggles a boolean value                | Show/hide modal, dark mode |

---

## 🧩 Custom Hooks + Context Together

You can combine both:

```jsx
// useTheme.js
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  return { theme, toggleTheme };
}
```

Then use it in your Context Provider — so your app theme persists and can be accessed globally.

---

