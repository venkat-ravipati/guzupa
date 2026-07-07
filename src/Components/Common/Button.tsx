export default function Button({ onclick, text }: { onclick: () => void, text: string }) {
  return (
    <button onClick={onclick}>
      {text}
    </button>
  )
}