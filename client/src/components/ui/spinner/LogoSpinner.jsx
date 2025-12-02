export default function LogoSpinner() {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/20 z-50'>
            <img
                src='/images/spinner/logo-spinner.svg'
                className='w-30 h-30 animate-spin opacity-90'
                alt='Loading...'
            />
        </div>
    );
}
