interface TimeDateProps {
  date: Date;
  day: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
}

const TimeDate = () => {
  const date: Date = new Date();
  const currentDate = date.toLocaleString();

  return <div className="col-span-3 text-center">{currentDate}</div>;
};

export default TimeDate;
