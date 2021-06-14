export default function Form({ onSubmit, ...props }) {
  function handleSubmit(event) {
    event.preventDefault();
    if (onSubmit) onSubmit(event);
    return false;
  }

  return (
    <form
      noValidate={true}
      onSubmit={handleSubmit}
      aria-label={props.name}
      {...props}
    />
  );
}
