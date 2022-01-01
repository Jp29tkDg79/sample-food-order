import classes from "./styles/Notification.module.css";

export type NotificationProps = {
  status: "error" | "success" | "pending";
  title: string;
  message: string;
};

const notification = ({ status, title, message }: NotificationProps) => {
  const cssClasses = `${classes.notification} ${
    status === "error" ? classes.error : classes.success
  }`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default notification;
