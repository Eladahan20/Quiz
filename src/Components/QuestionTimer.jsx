import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    /* Clean Up Function so it won't run after quiz is finished */

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    /* Clean Up Function so it won't run twice and double the speed of timer */

    return () => clearInterval(interval);
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}

/* The timeout is for the time the user have for the question */
/* The interval is for rendering the progress bar evrery x amount of time to show the progress */

/* In order to re render the progress bar every x amount of time i will need to use the state */
/* Why using useeffect on interval? becuase otherwise it will be infinite loop - we do not need dependencies becuase this is the usestate function */
/* Why using useeffect on timeout? becuase otherwise it will re run everytime the component is rendrerd and start from the begining. We will need
to define dependencies to it because timeout and ontimeout are props*/
