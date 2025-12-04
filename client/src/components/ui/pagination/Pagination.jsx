export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const goToPage = num => onPageChange(num);
    const goFirst = () => onPageChange(1);
    const goLast = () => onPageChange(totalPages);
    const goPrev = () => onPageChange(Math.max(currentPage - 1, 1));
    const goNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

    if (totalPages <= 1) return null;

    const btnClass =
        'bg-[#4A9603] hover:bg-[#5ECF00] text-black font-bold py-2 px-4 rounded-xl shadow-md border-b-4 border-black border-r-4 border-gray-900 transform transition-transform duration-300 hover:scale-105';

    return (
        <div className='flex justify-center gap-2 mb-8'>
            <button
                onClick={goFirst}
                disabled={currentPage === 1}
                className={btnClass}
            >
                First
            </button>
            <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className={btnClass}
            >
                Prev
            </button>

            {pageNumbers.map(num => (
                <button
                    key={num}
                    onClick={() => goToPage(num)}
                    className={`${btnClass} ${
                        currentPage === num ? 'ring-2 ring-[#5ECF00]' : ''
                    }`}
                >
                    {num}
                </button>
            ))}

            <button
                onClick={goNext}
                disabled={currentPage === totalPages}
                className={btnClass}
            >
                Next
            </button>
            <button
                onClick={goLast}
                disabled={currentPage === totalPages}
                className={btnClass}
            >
                Last
            </button>
        </div>
    );
}
