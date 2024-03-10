import React, {useRef} from 'react';
import { ErrorMessage, Field } from 'formik';
import oborHitam from '../assets/blak obor.png';

const FormGuru = ({compe, values, handleChange, handleBlur, setFieldValue, onFileUpload, setFieldTouched})  =>  {
    const foPenRef = useRef(null);
    
    return(
        <div className='my-8'>
        { compe.Teacher && (
        <div className="font-plusjakartasans">
            <h2 className="my-2 text-2xl text-left font-bold text-white">Identitas Pendamping</h2>
            <div className="px-5 lg:px-10 py-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white container relative">
                <div className="absolute items-start w-9/12 lg:w-5/12">
                    <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 " />
                </div> 
                <div className="block my-4">
                    <div className="font-semibold text-xl w-full">Nama Pendamping</div>
                    <div className="mt-2">
                        <Field type="text" name="nama_pendamping" placeholder='Tuliskan Nama Pendamping' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="nama_pendamping" />
                        </div>
                    </div>
                </div>
                {compe.Teacher_Number && (
                <div>
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Nomor Telepon</div>
                        <div className="mt-2">
                                <Field type="text" name="no_telp_guru" placeholder='Tuliskan Nomor Telepon' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name="no_telp_guru" />
                                </div>
                            </div>
                        </div>
                
                    <div className="block my-4">
                        <div className="font-semibold text-xl w-full">Email</div>
                        <div className="mt-2">
                                <Field type="text" name="email_guru" placeholder='Tuliskan Alamat E-mail' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name="email_guru" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="lg:flex mt-5">
                    {compe.Teacher_Photo && ( 
                        <div className='lg:mx-2 my-2'>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.foto_pendamping !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800`: ``}`} onClick={() => {foPenRef.current.click()}}>
                                <input type="file" ref={foPenRef} hidden name="foto_pendamping"
                                    onChange={(e) => {onFileUpload("foto_pendamping", e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button" >{values.foto_pendamping !== '' && values.foto_pendamping.name ? `Foto Pendamping (${values.foto_pendamping.name}) (Klik untuk ubah)`: '+ Foto Pendamping'}</button>
                            </div>
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name="foto_pendamping" />
                            </div>
                        </div>
                    )}
                </div>                
            </div>
        </div>
    )}
    </div>
    )
}

export default FormGuru;