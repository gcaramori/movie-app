import { CgSpinner } from 'react-icons/cg';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-full w-full relative text-white p-4 transition-all">
            <CgSpinner size="2em" className="block animate-spin" />
        </div>
    )
}

export default Spinner;