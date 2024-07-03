import { VscDebugRestart } from "react-icons/vsc";

interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <div className="col-end-7 col-span-1">
    <VscDebugRestart
      className=" fill-red-500 size-10 hover:cursor-pointer"
      onClick={onReset}
    />
  </div>
);
