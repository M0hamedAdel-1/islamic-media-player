const SelectInput = ({
  data = [],
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border-2 border-black text-black rounded-lg"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {data?.map((item) => (
          <option key={item.id} value={item.id} >
            {item.name|| item.sora_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;