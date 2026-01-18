import { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown({ onBirthdayReached, birthdayReached }) {
  // 🎯 Set your birthday here (future date)
  const targetDate = new Date(2026, 0, 22, 0, 0, 0); // Jan 22, 2026 at 00:00:00

  // Initialize time left
  const getTimeLeft = () => {
    const now = new Date();
    const diff = Math.max(0, targetDate - now);
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(getTimeLeft());

  // Countdown interval
  useEffect(() => {
    if (birthdayReached) return;

    const interval = setInterval(() => {
      const newTime = getTimeLeft();
      setTime(newTime);

      // Trigger birthday reached when countdown hits zero
      if (newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        onBirthdayReached();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [birthdayReached, onBirthdayReached]);

  // Digit component
  const Digit = ({ value, label }) => (
    <div className="digit">
      <div className="card">
        <div className="text">{String(value).padStart(2, "0")}</div>
      </div>
      <div className="label">{label}</div>
    </div>
  );

  // If birthday reached, show celebration
  if (birthdayReached) {
    return (
      <section className="countdown">
        <div className="flip-timer">
          <span className="birthday-celebration">🎉 It's Your Birthday! 🎉</span>
        </div>
      </section>
    );
  }

  // Show countdown
  return (
    <section className="countdown">
      <div className="flip-timer">
        <Digit value={time.hours} label="Hours" />
        <Digit value={time.minutes} label="Minutes" />
        <Digit value={time.seconds} label="Seconds" />
      </div>
    </section>
  );
}

export default Countdown;
