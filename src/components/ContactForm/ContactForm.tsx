import { useState, FormEvent, ChangeEvent, FC } from "react";

interface ContactFormProps {
  onSubmit: (name: string, number: string) => void;
}

export const ContactForm: FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  const handleChangeName = ({ target }: ChangeEvent) => {
    setName((target as HTMLInputElement).value);
  };
  const handleChangeNumber = ({ target }: ChangeEvent) => {
    setNumber((target as HTMLInputElement).value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(name, number);
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="inputName">
          Name
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          id="inputName"
          required
          value={name}
          onChange={handleChangeName}
        />
        <label className="form-label" htmlFor="inputNumber">
          {" "}
          Number
        </label>
        <input
          name="number"
          type="telephone"
          className="form-control"
          id="inputNumber"
          required
          value={number}
          onChange={handleChangeNumber}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};
