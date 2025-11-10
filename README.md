## 🧠 What is `useContext`?

`useContext` is a **React Hook** that allows you to access **data (state or values)** from a **Context** **without passing props manually** through every component level.

Think of it like a **shortcut for sharing data** (like user info, theme, or language) across many components, **without prop drilling**.

---

## 🧩 The Problem: “Prop Drilling”

Imagine this structure:

```
App
 ┣━ ComponentA
 ┃   ┗━ ComponentB
 ┃       ┗━ ComponentC
```

Now, suppose you have user data in `App`, and you want to show it in `ComponentC`.

Normally, you’d have to pass it down like this:

```jsx
<App>
  <ComponentA user={user} />
</App>

<ComponentA>
  <ComponentB user={user} />
</ComponentA>

<ComponentB>
  <ComponentC user={user} />
</ComponentB>
```

→ That’s **prop drilling** — passing the same prop down through multiple layers even if middle components don’t need it.

---

## 🪄 The Solution: Context + useContext

`useContext` solves this problem by letting any component **directly access** the shared data.

---

## 🧱 Steps to Use `useContext`

### 1. Create a Context

```jsx
import React, { createContext } from "react";

export const UserContext = createContext();
```

This `UserContext` will hold and share our data.

---

### 2. Provide the Context Value

Wrap the part of your app that needs access to the shared data with the **Provider**.

```jsx
import React from "react";
import { UserContext } from "./UserContext";
import Profile from "./Profile";

function App() {
  const user = { name: "Nitin", age: 23 };

  return (
    <UserContext.Provider value={user}>
      <Profile />
    </UserContext.Provider>
  );
}

export default App;
```

Now, any component inside `<UserContext.Provider>` can use this `user` value.

---

### 3. Consume the Context using `useContext`

In any child component, you can access the value directly.

```jsx
import React, { useContext } from "react";
import { UserContext } from "./UserContext";

function Profile() {
  const user = useContext(UserContext); // 👈 Access context value directly

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default Profile;
```

✅ No props passed manually
✅ Data accessible anywhere inside the Provider

---

## 🧠 Syntax Summary

```jsx
const value = useContext(MyContext);
```

---

## ⚙️ Real-World Use Cases

| Use Case         | Example                    |
| ---------------- | -------------------------- |
| Theme Management | Light / Dark Mode          |
| Authentication   | Logged-in user info        |
| Language         | Multi-language app         |
| Settings         | Global app settings        |
| State Sharing    | Between distant components |

---

## ⚠️ Common Mistakes

1. ❌ Using `useContext` **outside** a Provider
   → React will return `undefined`.

2. ❌ Updating context directly (context is read-only)
   → Use a state + setter inside Provider for dynamic updates.

---

## 🧩 Example with State Update

You can also store **state** inside the provider and share both value and setter.

```jsx
// ThemeContext.js
import { createContext, useState } from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

Then consume and update it:

```jsx
// Button.js
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

export default Button;
```

And wrap your app:

```jsx
import { ThemeProvider } from "./ThemeContext";
import Button from "./Button";

function App() {
  return (
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  );
}
```

---

## 🧾 Summary

| Step | What You Do                                           |
| ---- | ----------------------------------------------------- |
| 1️⃣  | Create a Context → `createContext()`                  |
| 2️⃣  | Wrap with Provider → `<Context.Provider value={...}>` |
| 3️⃣  | Consume with Hook → `useContext(Context)`             |

---




We’ll cover:
1️⃣ Prop Drilling
2️⃣ Lifting State Up
3️⃣ Controlled Components
4️⃣ Uncontrolled Components

---

## 🧩 1️⃣ What is **Prop Drilling**

**Prop Drilling** means passing data from a **top-level component** down to a deeply nested **child component** through many layers — even if the middle components don’t use that data.

It happens when there’s **no shared state mechanism** (like Context, Redux, etc.)

---

### 🧠 Example: Prop Drilling

```jsx
function App() {
  const user = "Nitin";
  return <Parent user={user} />;
}

function Parent({ user }) {
  // Parent doesn't need user but has to pass it down
  return <Child user={user} />;
}

function Child({ user }) {
  // Child also just passes it forward
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <h3>Hello {user}</h3>;
}
```

👉 **Problem:**
Even though only `GrandChild` needs `user`, it has to be passed through `Parent` and `Child`.
That’s **prop drilling** — it makes code hard to maintain.

---

### ✅ Solution

Use **Context + useContext** (we learned this earlier).
Then you can access `user` directly in `GrandChild` without passing through Parent/Child.

---

## 🧠 2️⃣ Lifting State Up

Now, the opposite situation 👇
Sometimes **two or more components** need to share or sync some data (state).
In that case, you **move the state up** to their **common parent** — this is called **Lifting State Up**.

---

### 🧩 Example: Without Lifting State Up

Two input boxes want to show the same text (shared data):

```jsx
function InputOne() {
  const [text, setText] = useState("");
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

function InputTwo() {
  const [text, setText] = useState("");
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

function App() {
  return (
    <div>
      <InputOne />
      <InputTwo />
    </div>
  );
}
```

➡️ Problem: Each component has its **own** state, so typing in one won’t update the other.

---

### ✅ With Lifting State Up

Move the state to a **common parent** (`App`) and pass it down.

```jsx
import { useState } from "react";

function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <InputBox text={text} setText={setText} />
      <InputBox text={text} setText={setText} />
      <p>Shared value: {text}</p>
    </div>
  );
}

function InputBox({ text, setText }) {
  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type here"
    />
  );
}
```

✅ Now, typing in one box updates both — they share the same state.
That’s **lifting state up**.

---

## 🎛️ 3️⃣ Controlled Components

In React, **Controlled Components** are form elements (**input**, **textarea**, **select**) whose values are **controlled by React state**.

React is the **“single source of truth.”**

---

### 🧩 Example: Controlled Input

```jsx
import { useState } from "react";

function ControlledForm() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}                 // ✅ controlled by state
        onChange={(e) => setName(e.target.value)} // updates state
      />
      <p>Hello {name}</p>
    </div>
  );
}
```

✅ Here:

* The input’s value is always taken from React state (`name`).
* Every keystroke triggers `onChange`, which updates state.
* React always knows what’s inside the input.

---

### 🔍 Advantages

✅ Predictable — React knows the current value.
✅ Easy to validate (e.g., disable button if input empty).
✅ Works well for complex forms.

---

## 🧾 4️⃣ Uncontrolled Components

In **Uncontrolled Components**, the data is handled by the **DOM itself**, not React.
You use a **ref** to access the value when needed.

---

### 🧩 Example: Uncontrolled Input

```jsx
import { useRef } from "react";

function UncontrolledForm() {
  const inputRef = useRef();

  function handleSubmit() {
    alert(`Name: ${inputRef.current.value}`);
  }

  return (
    <div>
      <input type="text" ref={inputRef} /> {/* 👈 React doesn’t control it */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

✅ Here:

* The value is **not stored in React state**.
* We just grab it from the DOM using `ref` when needed.

---

### 🔍 Advantages

✅ Less re-rendering → better for simple, performance-sensitive forms.
✅ Easy for integrating with non-React code.

### ⚠️ Disadvantages

❌ Harder to validate input live.
❌ React doesn’t know input value until you check it.

---

## 🧭 Summary Table

| Concept                    | Meaning                                        | Example                             | Key Point                  |
| -------------------------- | ---------------------------------------------- | ----------------------------------- | -------------------------- |
| **Prop Drilling**          | Passing data through many layers unnecessarily | `App → Parent → Child → GrandChild` | Use Context to avoid       |
| **Lifting State Up**       | Move shared state to common parent             | Two inputs share one state          | Keeps data in sync         |
| **Controlled Component**   | React controls input value via state           | `value={state}` + `onChange`        | React knows value always   |
| **Uncontrolled Component** | DOM manages input value                        | `ref.current.value`                 | React doesn’t manage value |

---






Let’s go step-by-step through a **beginner-friendly example** of using `useContext` in React to manage **theme switching (Light / Dark)** 🌗

---

### 🧠 What is `useContext`?

`useContext` lets you share data (like theme, language, user info) between multiple components **without passing props manually** at every level (a problem called “prop drilling”).

---

## 🌗 Example: Theme Switcher using `useContext`

We’ll make a simple app:

* A `ThemeContext` will store whether the theme is **light** or **dark**.
* We’ll have a button to toggle the theme.
* Components will read the theme using `useContext`.

---

### 1️⃣ Create the Theme Context (`ThemeContext.js`)

```jsx
import React, { createContext, useState } from "react";

// Create Context
export const ThemeContext = createContext();

// Create Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

### 2️⃣ Use it in your main app (`App.js`)

```jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import ThemeButton from "./ThemeButton";
import ThemeBox from "./ThemeBox";

function App() {
  return (
    <ThemeProvider>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>useContext Theme Example 🌗</h1>
        <ThemeButton />
        <ThemeBox />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

---

### 3️⃣ Create a Button component to toggle theme (`ThemeButton.js`)

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: theme === "light" ? "#222" : "#fff",
        color: theme === "light" ? "#fff" : "#222",
        border: "none",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
}

export default ThemeButton;
```

---

### 4️⃣ Create another component to **use** the theme (`ThemeBox.js`)

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ThemeBox() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#f9f9f9" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "30px",
        margin: "20px auto",
        width: "300px",
        borderRadius: "8px",
      }}
    >
      <p>The current theme is: <b>{theme}</b></p>
    </div>
  );
}

export default ThemeBox;
```

---

### 🔄 Output:

* Initially shows “Light Theme”.
* Click button → switches to Dark mode.
* Both components (`ThemeButton`, `ThemeBox`) react to the same context value.

---

### ⚡ Key Takeaways

✅ `createContext()` → creates a context
✅ `Provider` → shares data with children
✅ `useContext(Context)` → consumes the shared data
✅ Useful for global states (like theme, language, auth, etc.)

---


