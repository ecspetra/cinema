import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loader = () => {
  return (
    <div className="w-full h-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 flex justify-center items-center">
      <FontAwesomeIcon className="w-4 h-4 animate-spin" icon={faCircleNotch} />
    </div>
  );
};

export default Loader;
