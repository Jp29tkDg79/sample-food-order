import classes from "./styles/MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>サンプルオーダー</h2>
      <p>
        豊富な品揃えの中からお好きなお食事をお選びいただき、
        ご家庭で美味しいランチやディナーをお楽しみください。
      </p>
      <p>
        すべての食事は、高品質の食材を使用して、調理されています。
      </p>
    </section>
  );
};

export default MealsSummary;
