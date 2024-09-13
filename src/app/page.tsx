"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          console.log(555);
          
        }}
      >
        555
      </div>
    </main>
  );
}
