const Pagination = ({ props, currentPage, pagesLength }) => {
    const setPages = () => {
        let content = [];
        
        for (let i = 1; i < pagesLength + 1; i++) {
            content.push(
                <li key={i} className="block">
                    <button 
                        className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${currentPage === i ? 'bg-mainRed' : 'bg-transparent'}`} 
                        {...props}
                        data-page={i}
                    >
                        {i}
                    </button>
                </li>    
            );
        }

        return content;
    }

    return (
        <ul className="relative flex justify-start items-center gap-6 list-none">
            {setPages()}
        </ul>
    )
}

export default Pagination;