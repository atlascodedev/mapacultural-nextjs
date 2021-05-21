import React from "react";
import ContactForm from "./Form";

export interface ContactProps {}

const Contact = (props: ContactProps) => {
  return (
    <div>
      <ContactForm submitFn={async () => console.log("nothing for now")} />
    </div>
  );
};

export default Contact;
