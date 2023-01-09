import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ setSelectedPage, totalItems }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const items = [Array(parseInt(totalItems)).keys()];
    const pageCount = Math.ceil(totalItems / 20);

    const handlePageClick = (event) => {
        const newOffset = event.selected * 20 % items.length;
        setItemOffset(newOffset);

        setSelectedPage(event.selected + 1);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;