import Image from "next/image";
import "./title.css";
export default function Title() {
  return (
    <div className="title">
      <div className="center">
        <img
          src="https://joythebaker.com/wp-content/uploads/2023/09/Jan-Logo-900x132.png"
          height="60"
          width="1000"
          alt="Title"
        />
      </div>
    </div>
  );
}
