
import React, {useState} from 'react';
import { BsX } from 'react-icons/bs';

const TutorialPopup = ({setShowTutorialFunction}) => {

    const text = [
        "Pilihlah lomba yang akan diikuti dengan menekan tombol lomba yang ingin diikuti",
        "Bacalah Persyaratan Umum. Setelah membaca persyaratan umum, centanglah tombol 'Saya menyetujui seluruh syarat dan ketentuan yang berlaku pada SMAKONE CUP 2023.'",
        "Isilah data yang diperlukan. Untuk Pas Foto harap menggunakan foto yang jelas. Lalu Tekan tombol daftar, dan tunggulah uploading selesai.",
        "Setelah selesai upload, anda akan dipindahkan ke situs pembayaran.Bacalah total biaya yang harus dibayarkan, BAYARLAH SESUSAI DENGAN TOTAL BIAYA YANG DITAMPILKAN KE REKENING YANG DITAMPILKAN",
        "Unduh Halaman pembayaran dengan menekan tombol 'Unduh Halaman ini'"
    ]

    const [currentPage, setCurrentPage] = useState(0); // 0 to 5

    const goToNextPage = () => {
        if (currentPage != 4) {
            setCurrentPage(currentPage + 1);
        } else {
            setShowTutorialFunction(false);
        }
    }

    const goToPreviousPage = () => {
        if (currentPage != 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        // BACKGROUND BLUR
        <div className="absolute bg-gray-600 bg-opacity-50 backdrop-blur-md w-full h-screen z-20">
            <div className="flex h-screen items-center justify-center">
                {/* TUTORIAL BOX */}
                <div className="relative bg-purple-bg rounded-[2rem] h-3/4 xl:h-2/3 w-1/2">
                    {/* CLOSE BUTTON */}
                    <div className="absolute top-0 right-0 mr-4 mt-3 text-yellow-400">
                        <button onClick={() => setShowTutorialFunction(false)}><BsX color="#fff" size={40}/></button>
                    </div>
                    {/* IMAGE AND TEXT */}
                    <div className="flex flex-col bg-purple-bg rounded-[2rem] justify-center items-center">
                        <div className=''>
                            <div className="m-8 mt-14">
                                {/* IMAGE */}
                                <div className="w-full 2xl:h-[300px] sm:h-[150px] border-white border-4 rounded-2xl overflow-hidden">
                                    <img className="object-fill w-full min-h-full rounded-2xl" src={require(`../assets/tutorial/page${currentPage+1}.png`)}/>
                                </div>
                                {/* TEXT */}
                                <div className="relative w-full h-1/3 text-white font-semibold font-plusjakartasans mt-6">
                                    <p className="2xl:text-xl sm:text-sm 2xl:leading-10 sm:leading-8">
                                        {text[currentPage]}
                                    </p>
                                </div>
                            </div>
                            {/* SLIDER */}
                            <div className="flex w-full justify-between font-semibold font-plusjakartasans">
                                <div className="justify-self-start text-[#7D7D7D] ml-8">
                                    <button onClick={goToPreviousPage}>BACK</button>
                                </div>
                                <div className="flex flex-row w-[200px] justify-between text-[#7D7D7D] text-2xl">
                                    <div className={ currentPage == 0 ? "text-2xl text-[#A885FF]" : ""}> • </div>
                                    <div className={ currentPage == 1 ? "text-2xl text-[#A885FF]" : ""}> • </div>
                                    <div className={ currentPage == 2 ? "text-2xl text-[#A885FF]" : ""}> • </div>
                                    <div className={ currentPage == 3 ? "text-2xl text-[#A885FF]" : ""}> • </div>
                                    <div className={ currentPage == 4 ? "text-2xl text-[#A885FF]" : ""}> • </div>
                                </div>
                                <div className="justify-self-end text-[#A885FF] mr-8">
                                    <button onClick={goToNextPage}>NEXT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutorialPopup