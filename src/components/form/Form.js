export default function Form({ onSubmit, ...props }) {
  function handleSubmit(event) {
    event.preventDefault();
    if (onSubmit) onSubmit(event);
    return false;
  }

  return (
    <form
      aria-label={props.name}
      noValidate={true}
      onSubmit={handleSubmit}
      {...props}
    />
  );
}
