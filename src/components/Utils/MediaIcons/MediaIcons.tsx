import { ImGoogle3 } from "react-icons/im";
import {AiFillFacebook, AiFillTwitterCircle, AiOutlineGithub} from "react-icons/ai";

function MediaIcons() {
  const icons: any[] = [
    <ImGoogle3 className="w-5 h-5 text-current" />,
    <AiFillFacebook className="w-5 h-5 text-current" />,
    <AiFillTwitterCircle className="w-5 h-5 text-current" />,
    <AiOutlineGithub className="w-5 h-5 text-current" />,
  ].map((icon, i) => (
    <div
      key={i}
      className="flex w-10 h-10 justify-center
      items-center text-color-border border border-color-border rounded-full mr-2 hover:text-color-btn hover:border-color-btn transition-all ease-in duration-300 cursor-pointer"
    >
      {icon}
    </div>
  ));

  return <div className="flex mx-auto w-min">{icons}</div>;
}

export default MediaIcons;
