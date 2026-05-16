import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <div>
      <Link to="/">
        <img className="img1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaanUxFbiNPP3JvlzpDYrlDsEPx6DQ_a9tWg&usqp=CAU" alt="home" />
      </Link>
    </div>
  );
}
