import React, {useRef} from 'react';
import { ErrorMessage, Field } from 'formik';
import oborHitam from '../assets/blak obor.png';

const FormTim = ({compe, values, handleChange, handleBlur, setFieldValue, onFileUpload, setFieldTouched}) => {
    const surKetRef = useRef(null);
    
    return(
        <div className="my-8">
        {compe.fee_type === "TF" && compe.name !== "Vlog Competition" ?
        <div className="font-plusjakartasans">
            <h2 className="my-2 text-2xl text-left font-bold text-white">Identitas Tim</h2>  
            <div className="px-5 lg:px-10 py-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white container relative">
                <div className="absolute items-start w-9/12 lg:w-6/12">
                    <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 " />
                </div>
                <div className="block my-2">
                    <div className="font-semibold text-xl w-full">Nama Tim</div>
                    <div className="mt-2">
                        <Field type="text" name="nama_tim" placeholder='Tuliskan Nama Tim' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="nama_tim" />
                        </div>
                    </div>
                </div>
                {
                compe.School_type === "TS" &&
                <div className="block my-4">
                    <div className="font-semibold text-xl w-full">Nama Sekolah</div>
                    <div className="mt-2">
                        <Field type="text" name="nama_sekolah" placeholder='Tuliskan Nama Sekolah' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="nama_sekolah" />
                        </div>
                    </div>
                </div>
                }
                <div className="block my-4">
                    <div className="font-semibold text-xl w-full">Email Tim</div>
                    <div className="mt-2">
                        <Field type="text" name="email_tim" placeholder='Tuliskan Email Tim' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="email_tim" />
                        </div>
                    </div>
                </div>
                <div className="block my-4">
                    <div className="font-semibold text-xl w-full">Nomor Rekening</div>
                    <div className="mt-2">
                        <Field type="text" name="nomor_rek" placeholder='1980098741 BCA a/n Sylviana SE' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500">
                            <ErrorMessage name="nomor_rek" />
                        </div>
                    <div><p className="text-sm font-normal my-2">*Contoh penulisan :<br/> 1980098741 BCA a/n Sylviana SE</p></div> 
                    </div>
                </div>

                {compe.Surat_Sekolah && (
                    <div className='lg:mx-2 mt-7'>
                        <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                            ${values.surat_sekolah !== '' ? `bg-gradient-to-b from-violet-900 to-gray-800 ` : ``}`}  onClick={() => {surKetRef.current.click()}}>
                            <input type="file" ref={surKetRef} hidden name="surat_sekolah" 
                                onChange={(e) => {onFileUpload("surat_sekolah", e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                            <button className="font-bold" type="button" >{values.surat_sekolah !== '' && values.surat_sekolah.name ? `Surat Keterangan Sekolah (${values.surat_sekolah.name}) (Klik untuk ubah)`: '+ Surat Keterangan Sekolah'}</button>
                        </div> 
                        <div className="my-1 mx-3 text-red-500">
                            <ErrorMessage name="surat_sekolah" />
                        </div>
                    </div>
                )}

                {compe.custom_field.filter(x => x.field_level === 'TE').map((val, index)=> (
                    <div className="block my-4">
                        <div className="font-semibold text-xl w-full">{val.field_name}</div>
                        <div className="mt-2">
                            <Field name={`customFields.${val.id}`} as="select" placeholder={`Tuliskan ${val.field_name}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black" 
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} >
                                {val.choices.split("$").map((choice, idx)=>(
                                    <option value={`${choice.trim()}`}>{choice.trim()}</option>
                                ))}
                            </Field>
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`customFields.${val.id}`} />
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
        :
        <div>
        </div>
        }
        {compe.name === "Vlog Competition" &&
            <div className="font-plusjakartasans">
            {/* <h2 className="my-2 text-2xl text-left font-bold text-white">Identitas Tim</h2>   */}

            <div className="px-5 lg:px-10 py-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white container relative">
                <div className="absolute items-start w-9/12 lg:w-6/12">
                    <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 " />
                </div>
                <div className='font-semibold text-red-700 text-lg w-full '>
                    Apabila peserta lomba hanya 1 orang maka isi nama tim dengan nama peserta lomba, jika peserta lomba lebih dari 1 orang maka isi nama tim dengan nama perwakilan lomba.
                </div>
                <div className="block my-4">
                    <div className="font-semibold text-xl w-full">Nama Tim</div>
                    <div className="mt-2">
                        <Field type="text" name="nama_tim" placeholder='Tuliskan Nama Tim' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="nama_tim" />
                        </div>
                    </div>
                </div>
                {compe.School_type === "TS" &&
                <div className="block my-2">
                    <div className="font-semibold text-xl w-full">Nama Sekolah</div>
                    <div className="mt-2">
                        <Field type="text" name="nama_sekolah" placeholder='Tuliskan Nama Sekolah' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="nama_sekolah" />
                        </div>
                    </div>
                </div>
                }
                <div className="block my-2">
                    <div className="font-semibold text-xl w-full">Email Tim</div>
                    <div className="mt-2">
                        <Field type="text" name="email_tim" placeholder='Tuliskan Email Tim' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="email_tim" />
                        </div>
                    </div>
                </div>
                <div className="block my-2">
                    <div className="font-semibold text-xl w-full">Nomor Rekening</div>
                    <div className="mt-2">
                        <Field type="text" name="nomor_rek" placeholder='1980098741 BCA a/n Sylviana SE' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="nomor_rek" />
                        </div>
                        <div><p className="text-sm font-normal my-2">*Contoh penulisan :<br/> 1980098741 BCA a/n Sylviana SE</p></div>
                    </div>
                </div>

                {compe.Surat_Sekolah && (
                    <div className='lg:mx-2 mt-7'>
                        <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                            ${values.surat_sekolah !== '' ? `bg-gradient-to-b from-violet-900 to-gray-800 ` : ``}`}  onClick={() => {surKetRef.current.click()}}>
                            <input type="file" ref={surKetRef} hidden name="surat_sekolah" 
                                onChange={(e) => {onFileUpload("surat_sekolah", e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                            <button className="font-bold" type="button" >{values.surat_sekolah !== '' && values.surat_sekolah.name ? `Surat Keterangan Sekolah (${values.surat_sekolah.name}) (Klik untuk ubah)`: '+ Surat Keterangan Sekolah'}</button>
                        </div> 
                        <div className="my-1 mx-3 text-red-500">
                            <ErrorMessage name="surat_sekolah" />
                        </div>
                    </div>
                )}
            </div>
        </div>
        }
    </div>
    )
}

export default FormTim;