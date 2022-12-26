const InputComponent: React.FC<{
  placeholder: string;
  type: string;
  name: string;
  validation: {};
  register: any;
  error: any;
  icon: any;
}> = (props) => {
  const error: string = props.error[props.name]?.message
    ? "text-color-red border-color-red focus:outline-0 "
    : "border-color-border text-text-p-color";

  return (
    <div className="flex flex-col mb-3.5">
      <div className="flex relative w-full">
        <input
          type={props.type}
          placeholder={props.placeholder}
          {...props.register(props.name, props.validation)}
          className={`border  py-2 pl-11 pr-3 w-full rounded-lg outline-0 ${error}`}
        />
        {props.icon}
      </div>
      <small className="text-color-red pt-1">
        {props.error[props.name]?.message}
      </small>
    </div>
  );
};

export default InputComponent;
