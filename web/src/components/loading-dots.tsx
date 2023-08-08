import styles from "./loading-dots.module.css";

const LoadingDots = ({ color = "currentColor" }: { color?: string }) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export { LoadingDots };
