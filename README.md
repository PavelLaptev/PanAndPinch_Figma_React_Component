# PanAndPinch React Component for Figma

A basic pan and pinch component for Figma.

---

### 🕹 Features

- Works without dependencies
- Adjustable maximum and minimum zoom value
- Adjsutable pan speed

---

### 📺 [DEMO](https://codesandbox.io/s/pan-and-pinch-demo-jeyqx?file=/src/App.tsx)

---

### 🛠 How to install

1. Copy the component `PanAndPinch.tsx` into your project and import it `import PanAndPinch from "./PanAndPinch"`.
2. Pass your children inside the component `<PanAndPinch> {children} </PanAndPinch>`.

You can also download the whole repo and run it as a Figma plugin. To run the wather use `yarn build:watch`.

---

### ⚙️ Properties

- `test` — makes component containers visible
- `zoomFactor={{ min: number, max: number }}` — adjust maximum zoom in/out value. by default maximum `3` and minimum `0.3`
- `panSpeedRatio={number}` — the speed of pan effect. by default `1.4`

---

### 🗞 [Article](https://pavellaptev.medium.com/how-to-create-a-pan-n-pinch-component-for-a-figma-plugin-step-by-step-recipe-afea4d296e0)
