import React from "react";
import "./About.scss";

const About = () => {
  const [form, setForm] = React.useState({ title: null });
  // throw new Error("Error Sangheon");
  return <div className="About">{form.title}123</div>;
};

export default About;
