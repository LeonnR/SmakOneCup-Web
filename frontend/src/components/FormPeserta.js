import React, {useRef, useEffect} from 'react';
import { ErrorMessage, Field } from 'formik';
import oborHitam from '../assets/blak obor.png';

const FormPeserta = ({numPeserta, compe, values, handleChange, handleBlur, setFieldValue, onFileUpload, setFieldTouched})  => {  
    let numArr = numPeserta - 1;
    let pasFoRef = useRef(null);
    let idenRef = useRef(null);
    let akteRef  = useRef(null);
    // let Jersey_TerangRef = useRef(null);
    // let Jersey_GelapRef = useRef(null);
    let izinRef = useRef(null);
    const surKetRef = useRef(null);
    //let resikoRef = useRef(null); 

    // console.log(values.dataPeserta)
    // console.log(compe)

    
    return(
        <>
        <div className='my-8'>
        {compe.fee_type === "TF" &&
        <div className="font-plusjakartasans">
            <h2 className="my-2 text-2xl text-left font-bold text-white">Peserta Lomba {numPeserta}</h2>
            <div className="px-5 lg:px-10 py-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white container relative">
            <div className="absolute items-start w-9/12 lg:w-5/12">
                    <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 " />
                </div>
                <div className="block my-4">
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Nama</div>
                        <div className="mt-2">
                            <Field type="text" name={`dataPeserta.${numArr}.nama_peserta`} placeholder={`Tuliskan Nama Peserta ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.nama_peserta`} />
                            </div>
                        </div>
                    </div>
                    { compe.School_type === "PS" &&
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Nama Sekolah</div>
                        <div className="mt-2">
                        <Field type="text" name={`dataPeserta.${numArr}.nama_sekolah_peserta`} placeholder={`Tuliskan Nama Sekolah ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.nama_sekolah_peserta`} />
                            </div>
                        </div>
                    </div>
                    }
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Tanggal Ulang Tahun</div>
                        <div className="mt-2">
                            <Field type="date" name={`dataPeserta.${numArr}.ultah`} placeholder={`MM/DD/YYYY`} className=" placeholder:text-slate-300 relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.ultah`} />
                            </div>
                        </div>
                    </div>
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Umur</div>
                        <div className="mt-2">
                            <Field type="number" name={`dataPeserta.${numArr}.umur`} placeholder={`Tuliskan Umur Peserta ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.umur`} />
                            </div>
                        </div>
                    </div>
                    {compe.Nomor_Peserta && (
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">Nomor Telepon</div>
                            <div className="mt-2">
                                <Field type="text" name={`dataPeserta.${numArr}.no_telp_peserta`} placeholder={`Tuliskan Nomor Telepon Peserta ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.no_telp_peserta`} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Alamat E-Mail</div>
                        <div className="mt-2">
                            <Field type="text" name={`dataPeserta.${numArr}.email_peserta`} placeholder={`Tuliskan Alamat E-Mail Peserta ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.email_peserta`} />
                            </div>
                        </div>
                    </div>

                    {compe.custom_field.filter(x => x.field_level === 'PA').map((val, idx)=> (
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">{val.field_name}</div>
                            <div className="mt-2">
                                <Field name={`dataPeserta.${numArr}.customFields.${val.id}`} as="select" placeholder={`Tuliskan ${val.field_name}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black" 
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} >
                                    {val.choices.split("$").map((choice, idx)=>(
                                        <option value={`${choice.trim()}`}>{choice.trim()}</option>
                                    ))}
                                </Field>
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.customFields.${val.id}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="lg:flex mt-5 flex-wrap">
                    {compe.Pas_Foto && (
                        <div className='lg:mx-2 my-2'>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].pas_foto !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {pasFoRef.current.click()}}>
                                <input type="file" ref={pasFoRef} hidden name={`dataPeserta.${numArr}.pas_foto`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.pas_foto`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button" >
                                    {values.dataPeserta[numArr].pas_foto !== '' && values.dataPeserta[numArr].pas_foto.name ? `Pas Foto (${values.dataPeserta[numArr].pas_foto.name})(Klik untuk ubah)`: '+ Pas Foto'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.pas_foto`} />
                            </div>
                        </div>
                    )}
                    {compe.Identitas && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-18 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].bukti_identitas !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {idenRef.current.click()}}>
                                <input type="file" ref={idenRef} hidden name={`dataPeserta.${numArr}.bukti_identitas`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.bukti_identitas`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}} />
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].bukti_identitas !== '' && values.dataPeserta[numArr].bukti_identitas.name ? `Bukti Identitas (${values.dataPeserta[numArr].bukti_identitas.name})(Klik untuk ubah)`: '+ Bukti Identitas'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.bukti_identitas`} />
                            </div>
                        </div>
                    )}
                    {compe.Akte_Lahir && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].akte_lahir !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {akteRef.current.click()}}>
                                <input type="file" ref={akteRef} hidden name={`dataPeserta.${numArr}.akte_lahir`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.akte_lahir`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].akte_lahir !== '' && values.dataPeserta[numArr].akte_lahir.name ? `Akte Lahir (${values.dataPeserta[numArr].akte_lahir.name})(Klik untuk ubah)`: '+ Akte Lahir'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )}
                    {/* {compe.Foto_Jersey_Terang && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].Foto_Jersey_Terang !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {Jersey_TerangRef.current.click()}}>
                                <input type="file" ref={Jersey_TerangRef} hidden name={`dataPeserta.${numArr}.Foto_Jersey_Terang`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.Foto_Jersey_Terang`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].Foto_Jersey_Terang !== '' && values.dataPeserta[numArr].Foto_Jersey_Terang.name ? `Jersey Terang (${values.dataPeserta[numArr].Foto_Jersey_Terang.name})(Klik untuk ubah)`: '+ Jersey Terang'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )}
                    {compe.Foto_Jersey_Gelap && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].Foto_Jersey_Gelap !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {Jersey_GelapRef.current.click()}}>
                                <input type="file" ref={Jersey_GelapRef} hidden name={`dataPeserta.${numArr}.Foto_Jersey_Gelap`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.Foto_Jersey_Gelap`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].Foto_Jersey_Gelap !== '' && values.dataPeserta[numArr].Foto_Jersey_Gelap.name ? `Jersey Gelap (${values.dataPeserta[numArr].Foto_Jersey_Gelap.name})(Klik untuk ubah)`: '+ Jersey Gelap'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )} */}
                    

                    {compe.Surat_Izin_Orangtua && (
                        <div className={`lg:mx-2 my-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].izin !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {izinRef.current.click()}}>
                                <input type="file" ref={izinRef} hidden name={`dataPeserta.${numArr}.izin`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.izin`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].izin !== '' && values.dataPeserta[numArr].izin.name ? `Izin Orang Tua (${values.dataPeserta[numArr].izin.name})(Klik untuk ubah)`: '+ Izin Orang Tua'}
                                </button>
                            </div>
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.izin`} />
                            </div>
                        </div>
                    )}
                    {/*
                    <div className='lg:mx-2 my-2'>
                        <div className="w-full lg:w-fit py-3 px-5 lg:px-10 rounded-3xl bg-yellow-400 hover:bg-yellow-500 text-center"  onClick={() => {resikoRef.current.click()}}>
                            <input type="file" ref={resikoRef} hidden name={`dataPeserta.${numArr}.resiko`} 
                                onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.resiko`, e.target.files[0], setFieldValue); handleChange(e)}}/>
                            <button className="font-bold " type="button">+Bersedia Resiko<br/></button> 
                        </div>
                        <div className="my-1 mx-3 text-red-500">
                            <ErrorMessage name={`dataPeserta.${numArr}.resiko`} />
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </div>
        }
        {
        compe.fee_type === "PF" && compe.name !== "Vlog Competition" ?  

        <div className="font-plusjakartasans">
            <h2 className="my-2 text-2xl text-left font-bold text-white">Peserta Lomba</h2>
            <div className="px-5 lg:px-10 py-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white container relative">
                <div className="absolute items-start w-9/12 lg:w-7/12">
                    <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 " />
                </div> 
                <div className="">
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Nama</div>
                        <div className="mt-2">
                            <Field type="text" name={`dataPeserta.${numArr}.nama_peserta`} placeholder={`Tuliskan Nama Peserta `} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.nama_peserta`} />
                            </div>
                        </div>
                    </div>
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Nama Sekolah</div>
                        <div className="mt-2">
                        <Field type="text" name={`dataPeserta.${numArr}.nama_sekolah_peserta`} placeholder={`Tuliskan Nama Sekolah`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.nama_sekolah_peserta`} />
                            </div>
                        </div>
                    </div>
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Email Peserta</div>
                        <div className="mt-2">
                            <Field type="text" name="email_tim" placeholder='Tuliskan Email Peserta' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name="email_tim" />
                            </div>
                        </div>
                    </div>
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Tanggal Ulang Tahun</div>
                        <div className="mt-2">
                            <Field type="date" name={`dataPeserta.${numArr}.ultah`} placeholder={`MM/DD/YYYY`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.ultah`} />
                            </div>
                        </div>
                    </div>
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Umur</div>
                        <div className="mt-2">
                            <Field type="number" name={`dataPeserta.${numArr}.umur`} placeholder={`Tuliskan Umur Peserta `} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name={`dataPeserta.${numArr}.umur`} />
                            </div>
                        </div>
                    </div>
                    {compe.Nomor_Peserta && (
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">Nomor Telepon</div>
                            <div className="mt-2">
                                <Field type="text" name={`dataPeserta.${numArr}.no_telp_peserta`} placeholder={`Tuliskan Nomor Telepon Peserta`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.no_telp_peserta`} />
                                </div>
                            </div>
                        </div>
                    )}
                <div className="block my-2">
                    <div className="font-semibold text-xl w-full">Nomor Rekening
                    </div>
                    <div className="mt-2">
                        <Field type="text" name="nomor_rek" placeholder='1980098741 BCA a/n Sylviana SE' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name="nomor_rek" />
                        </div>
                        <div><p className="text-sm font-normal my-2">*Contoh penulisan :<br/> 1980098741 BCA a/n Sylviana SE</p></div> 
                    </div>
                </div>
                {compe.custom_field.filter(x => x.field_level === 'PA').map((val, idx)=> (
                <div className="block my-2">
                    <div className="font-semibold text-xl w-full">
                        {val.field_name}
                    </div>
                    <div className="mt-2">
                        <Field name={`dataPeserta.${numArr}.customFields.${val.id}`} as="select" placeholder={`Tuliskan ${val.field_name}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black" 
                            onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} >
                            {val.choices.split("$").map((choice, idx)=>(
                                <option value={`${choice.trim()}`}>{choice.trim()}</option>
                            ))}
                        </Field>
                        <div className="mx-3 text-red-500"> 
                            <ErrorMessage name={`dataPeserta.${numArr}.customFields.${val.id}`} />
                        </div>
                    </div>
                </div>
                ))}

                </div>
                
                <div className="lg:flex mt-5 flex-wrap">
                    {compe.Pas_Foto && (
                        <div className='lg:mx-2 my-2'>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].pas_foto !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {pasFoRef.current.click()}}>
                                <input type="file" ref={pasFoRef} hidden name={`dataPeserta.${numArr}.pas_foto`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.pas_foto`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button" >
                                    {values.dataPeserta[numArr].pas_foto !== '' && values.dataPeserta[numArr].pas_foto.name ? `Pas Foto (${values.dataPeserta[numArr].pas_foto.name})(Klik untuk ubah)`: '+ Pas Foto'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.pas_foto`} />
                            </div>
                        </div>
                    )}
                    {compe.Identitas && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].bukti_identitas !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {idenRef.current.click()}}>
                                <input type="file" ref={idenRef} hidden name={`dataPeserta.${numArr}.bukti_identitas`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.bukti_identitas`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}} />
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].bukti_identitas !== '' && values.dataPeserta[numArr].bukti_identitas.name ? `Bukti Identitas (${values.dataPeserta[numArr].bukti_identitas.name})(Klik untuk ubah)`: '+ Bukti Identitas'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.bukti_identitas`} />
                            </div>
                        </div>
                    )}
                    {compe.Akte_Lahir && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].akte_lahir !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {akteRef.current.click()}}>
                                <input type="file" ref={akteRef} hidden name={`dataPeserta.${numArr}.akte_lahir`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.akte_lahir`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].akte_lahir !== '' && values.dataPeserta[numArr].akte_lahir.name ? `Akte Lahir (${values.dataPeserta[numArr].akte_lahir.name})(Klik untuk ubah)`: '+ Akte Lahir'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )}
                    {/* {compe.Foto_Jersey_Terang && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].Foto_Jersey_Terang !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {Jersey_TerangRef.current.click()}}>
                                <input type="file" ref={Jersey_TerangRef} hidden name={`dataPeserta.${numArr}.Foto_Jersey_Terang`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.Foto_Jersey_Terang`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].Foto_Jersey_Terang !== '' && values.dataPeserta[numArr].Foto_Jersey_Terang.name ? `Jersey Terang (${values.dataPeserta[numArr].Foto_Jersey_Terang.name})(Klik untuk ubah)`: '+ Jersey Terang'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )}
                    {compe.Foto_Jersey_Gelap && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].Foto_Jersey_Gelap !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {Jersey_GelapRef.current.click()}}>
                                <input type="file" ref={Jersey_GelapRef} hidden name={`dataPeserta.${numArr}.Foto_Jersey_Gelap`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.Foto_Jersey_Gelap`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].Foto_Jersey_Gelap !== '' && values.dataPeserta[numArr].Foto_Jersey_Gelap.name ? `Jersey Gelap (${values.dataPeserta[numArr].Foto_Jersey_Gelap.name})(Klik untuk ubah)`: '+ Jersey Gelap'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )} */}
                    
                    
                    {compe.Surat_Izin_Orangtua && (
                        <div className={`lg:mx-2 my-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].izin !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {izinRef.current.click()}}>
                                <input type="file" ref={izinRef} hidden name={`dataPeserta.${numArr}.izin`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.izin`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].izin !== '' && values.dataPeserta[numArr].izin.name ? `Izin Orang Tua (${values.dataPeserta[numArr].izin.name})(Klik untuk ubah)`: '+ Izin Orang Tua'}
                                </button>
                            </div>
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.izin`} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        :
        <div>
        </div>}
        {
        compe.fee_type === "PF" && compe.name === "Vlog Competition" ?
                <div className="font-plusjakartasans">
                <h2 className="my-2 text-2xl text-left font-bold text-white">Peserta Lomba</h2>
                <div className="px-5 lg:px-10 py-5 rounded-3xl bg-gradient-to-r from-[#a4a4ac] to-[#70647c] text-white container relative">
                    <div className="absolute items-start w-9/12 lg:w-6/12">
                    <img src={`${oborHitam}`} alt="logo" className="justify-left opacity-5 " />
                </div>
                    <div className="">
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">Nama</div>
                            <div className="mt-2">
                                <Field type="text" name={`dataPeserta.${numArr}.nama_peserta`} placeholder={`Tuliskan Nama Peserta ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.nama_peserta`} />
                                </div>
                            </div>
                        </div>
                        
                        { compe.School_type === "PS" &&
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">Nama Sekolah</div>
                            <div className="mt-2">
                            <Field type="text" name={`dataPeserta.${numArr}.nama_sekolah_peserta`} placeholder={`Tuliskan Nama Sekolah ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.nama_sekolah_peserta`} />
                                </div>
                            </div>
                        </div>
                        }
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">Alamat E-Mail</div>
                            <div className="mt-2">
                                <Field type="text" name={`dataPeserta.${numArr}.email_peserta`} placeholder={`Tuliskan Alamat E-Mail Peserta ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.email_peserta`} />
                                </div>
                            </div>
                        </div>
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">Tanggal Ulang Tahun</div>
                            <div className="mt-2">
                                <Field type="date" name={`dataPeserta.${numArr}.ultah`} placeholder={`Tuliskan Nama Peserta ${numPeserta}`} className="relative w-full bg-purple-900 py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.ultah`} />
                                </div>
                            </div>
                        </div>
                        <div className="block my-2">
                            <div className="font-semibold text-xl w-full">Umur</div>
                            <div className="mt-2">
                                <Field type="number" name={`dataPeserta.${numArr}.umur`} placeholder={`Tuliskan Umur Peserta ${numPeserta} `} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                    onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name={`dataPeserta.${numArr}.umur`} />
                                </div>
                            </div>
                        </div>
                        {compe.Nomor_Peserta && (
                            <div className="block my-2">
                                <div className="font-semibold text-xl w-full">Nomor Telepon</div>
                                <div className="mt-2">
                                    <Field type="text" name={`dataPeserta.${numArr}.no_telp_peserta`} placeholder={`Tuliskan Nomor Telepon Peserta ${numPeserta}`} className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                        onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                                    <div className="mx-3 text-red-500"> 
                                        <ErrorMessage name={`dataPeserta.${numArr}.no_telp_peserta`} />
                                    </div>
                                </div>
                            </div>
                        )}
                    <div className="block my-2">
                        <div className="font-semibold text-xl w-full">Nomor Rekening
                        </div>
                        <div className="mt-2">
                            <Field type="text" name="nomor_rek" placeholder='1980098741 BCA a/n Sylviana SE' className="relative w-full bg-white py-2 px-5 rounded-3xl text-black"
                                onChange={(e) => {handleChange(e)}} onBlur={(e)=> {handleBlur(e)}} />
                            <div className="mx-3 text-red-500"> 
                                <ErrorMessage name="nomor_rek" />
                            </div>
                            <div><p className="text-sm font-normal my-2">*Contoh penulisan :<br/> 1980098741 BCA a/n Sylviana SE</p></div> 
                        </div>
                    </div>
                    </div>
                    
                    <div className="lg:flex mt-5 flex-wrap">
                        {compe.Pas_Foto && (
                            <div className='lg:mx-2 my-2'>
                                <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                    ${values.dataPeserta[numArr].pas_foto !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {pasFoRef.current.click()}}>
                                    <input type="file" ref={pasFoRef} hidden name={`dataPeserta.${numArr}.pas_foto`} 
                                        onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.pas_foto`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                    <button className="font-bold" type="button" >
                                        {values.dataPeserta[numArr].pas_foto !== '' && values.dataPeserta[numArr].pas_foto.name ? `Pas Foto (${values.dataPeserta[numArr].pas_foto.name})(Klik untuk ubah)`: '+ Pas Foto'}
                                    </button>
                                </div> 
                                <div className="my-1 mx-3 text-red-500">
                                    <ErrorMessage name={`dataPeserta.${numArr}.pas_foto`} />
                                </div>
                            </div>
                        )}
                        {compe.Identitas && (
                            <div className={`my-2 lg:mx-2`}>
                                <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                    ${values.dataPeserta[numArr].bukti_identitas !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {idenRef.current.click()}}>
                                    <input type="file" ref={idenRef} hidden name={`dataPeserta.${numArr}.bukti_identitas`} 
                                        onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.bukti_identitas`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}} />
                                    <button className="font-bold" type="button">
                                        {values.dataPeserta[numArr].bukti_identitas !== '' && values.dataPeserta[numArr].bukti_identitas.name ? `Bukti Identitas (${values.dataPeserta[numArr].bukti_identitas.name})(Klik untuk ubah)`: '+ Bukti Identitas'}
                                    </button>
                                </div> 
                                <div className="my-1 mx-3 text-red-500">
                                    <ErrorMessage name={`dataPeserta.${numArr}.bukti_identitas`} />
                                </div>
                            </div>
                        )}
                        {compe.Akte_Lahir && (
                            <div className={`my-2 lg:mx-2`}>
                                <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                    ${values.dataPeserta[numArr].akte_lahir !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {akteRef.current.click()}}>
                                    <input type="file" ref={akteRef} hidden name={`dataPeserta.${numArr}.akte_lahir`} 
                                        onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.akte_lahir`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                    <button className="font-bold" type="button">
                                        {values.dataPeserta[numArr].akte_lahir !== '' && values.dataPeserta[numArr].akte_lahir.name ? `Akte Lahir (${values.dataPeserta[numArr].akte_lahir.name})(Klik untuk ubah)`: '+ Akte Lahir'}
                                    </button>
                                </div> 
                                <div className="my-1 mx-3 text-red-500">
                                    <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                                </div>
                            </div>
                        )}
                        {/* {compe.Foto_Jersey_Terang && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].Foto_Jersey_Terang !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {Jersey_TerangRef.current.click()}}>
                                <input type="file" ref={Jersey_TerangRef} hidden name={`dataPeserta.${numArr}.Foto_Jersey_Terang`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.Foto_Jersey_Terang`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].Foto_Jersey_Terang !== '' && values.dataPeserta[numArr].Foto_Jersey_Terang.name ? `Jersey Terang (${values.dataPeserta[numArr].Foto_Jersey_Terang.name})(Klik untuk ubah)`: '+ Jersey Terang'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )}
                        {compe.Foto_Jersey_Gelap && (
                        <div className={`my-2 lg:mx-2`}>
                            <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                ${values.dataPeserta[numArr].Foto_Jersey_Gelap !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {Jersey_GelapRef.current.click()}}>
                                <input type="file" ref={Jersey_GelapRef} hidden name={`dataPeserta.${numArr}.Foto_Jersey_Gelap`} 
                                    onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.Foto_Jersey_Gelap`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                <button className="font-bold" type="button">
                                    {values.dataPeserta[numArr].Foto_Jersey_Gelap !== '' && values.dataPeserta[numArr].Foto_Jersey_Gelap.name ? `Jersey Gelap (${values.dataPeserta[numArr].Foto_Jersey_Gelap.name})(Klik untuk ubah)`: '+ Jersey Gelap'}
                                </button>
                            </div> 
                            <div className="my-1 mx-3 text-red-500">
                                <ErrorMessage name={`dataPeserta.${numArr}.akte_lahir`} />
                            </div>
                        </div>
                    )} */}
                        
                        
                        {compe.Surat_Izin_Orangtua && (
                            <div className={`lg:mx-2 my-2`}>
                                <div className={`relative w-full lg:w-fit px-5 lg:px-10 py-3 bg-bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full HOVER-GLOW rounded-3xl border text-center cursor-pointer
                                    ${values.dataPeserta[numArr].izin !== "" ? `bg-gradient-to-b from-violet-900 to-gray-800` : ``}`} onClick={() => {izinRef.current.click()}}>
                                    <input type="file" ref={izinRef} hidden name={`dataPeserta.${numArr}.izin`} 
                                        onChange={(e) => {onFileUpload(`dataPeserta.${numArr}.izin`, e.target.files[0], setFieldValue, setFieldTouched); handleChange(e)}}/>
                                    <button className="font-bold" type="button">
                                        {values.dataPeserta[numArr].izin !== '' && values.dataPeserta[numArr].izin.name ? `Izin Orang Tua (${values.dataPeserta[numArr].izin.name})(Klik untuk ubah)`: '+ Izin Orang Tua'}
                                    </button>
                                </div>
                                <div className="my-1 mx-3 text-red-500">
                                    <ErrorMessage name={`dataPeserta.${numArr}.izin`} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        :
        <div>
        </div>
        }
        </div>
        </>
    )
};

export default FormPeserta;