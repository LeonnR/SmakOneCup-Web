import axios from 'axios';

const postData = (value, navigate) => {
    //TEAM
    const teamData = new FormData();
    teamData.append('Team_Name', value.nama_tim);
    teamData.append('School', value.nama_sekolah);
    teamData.append('Members', value.dataPeserta.length);
    teamData.append('Competition', value.lomba);
    teamData.append('Email', value.email_tim);
    if (value.surat_sekolah.blob !== undefined) {
        teamData.append('Surat_Sekolah', new Blob([value.surat_sekolah.blob]), value.surat_sekolah.name);
    }
    teamData.append('Nomor_Rekening', value.nomor_rek);
    
    return axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/Team/`,
        data: teamData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    // .catch((error) => {console.log(error)})
    .then((teamResponse) => {
        // console.log(teamResponse.data.id);

        // TEAM CUSTOM FIELDS
        for (const [key, val] of Object.entries(value.customFields)) {
            const customFieldData = new FormData();
            customFieldData.append('field', key);
            customFieldData.append('value', val);
            customFieldData.append('field_level', 'TE');
            customFieldData.append('post_token', teamResponse.data.Post_Token);
            axios({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/CustomFieldResult/`,
                data: customFieldData,
                headers: { "Content-Type": "multipart/form-data" },
            })
        }

        var participantPostArray = [];
    
        //PARTICIPANT & DOCUMENT
        value.dataPeserta.forEach((peserta, index) => {

            //PARTICIPANT
            const participantData = new FormData();
            participantData.append('name', peserta.nama_peserta);
            participantData.append('School', peserta.nama_sekolah_peserta);
            participantData.append('Email', peserta.email_peserta);
            participantData.append('birthdate', peserta.ultah);
            participantData.append('age', peserta.umur);
            participantData.append('phone', peserta.no_telp_peserta);
            participantData.append('post_token', teamResponse.data.Post_Token); 

            const participantPost = axios({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/Participant/`,
                data: participantData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            // .catch((error) => {console.log(error)})
            .then((partiResponse) => {
                // console.log(partiResponse.data.id);
                // PARTICIPANT CUSTOM FIELDS
                for (const [key, val] of Object.entries(peserta.customFields)) {
                    const customFieldData = new FormData();
                    customFieldData.append('field', key);
                    customFieldData.append('value', val);
                    customFieldData.append('field_level', 'PA');
                    customFieldData.append('post_token', partiResponse.data.post_token);
                    axios({
                        method: "post",
                        url: `${process.env.REACT_APP_BACKEND_URL}/api/CustomFieldResult/`,
                        data: customFieldData,
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                }

                //DOCUMENT
                const documentData = new FormData();
                documentData.append('post_token', partiResponse.data.post_token);
                if (peserta.akte_lahir.blob !== undefined) {
                    documentData.append('akte_lahir', new Blob([peserta.akte_lahir.blob]), peserta.akte_lahir.name);
                }
                if (peserta.pas_foto.blob !== undefined ) {
                    documentData.append('pas_foto', new Blob([peserta.pas_foto.blob]), peserta.pas_foto.name);
                }
                if (peserta.bukti_identitas.blob !== undefined ) {
                    documentData.append('Kartu_Identitas', new Blob([peserta.bukti_identitas.blob]), peserta.bukti_identitas.name);
                }
                // if (peserta.Foto_Jersey_Terang.blob !== undefined) {
                //     documentData.append('Foto_Jersey_Terang', new Blob([peserta.Foto_Jersey_Terang.blob]), peserta.Foto_Jersey_Terang.name);
                // }
                // if (peserta.Foto_Jersey_Gelap.blob !== undefined) {
                //     documentData.append('Foto_Jersey_Gelap', new Blob([peserta.Foto_Jersey_Gelap.blob]), peserta.Foto_Jersey_Gelap.name);
                // }
                if (peserta.izin.blob !== undefined) {
                    documentData.append('Surat_Izin_Orangtua', new Blob([peserta.izin.blob]), peserta.izin.name);
                }
                if (peserta.resiko.blob !== undefined) {
                    documentData.append('Surat_Penanggung_Resiko', new Blob([peserta.resiko.blob]), peserta.resiko.name);
                }

                return axios({
                    method: "post",
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/Document/`,
                    data: documentData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                //.then((docResponse) => {console.log(docResponse);})
                // .catch((error) => {console.log(error)});                
            })

            participantPostArray.push(participantPost);
        })
        
        //TEACHER
        const teachData = new FormData();

        teachData.append('name', value.nama_pendamping);
        teachData.append('email', value.email_guru);
        teachData.append('phone', value.no_telp_guru);
        teachData.append('whatsapp', value.wa_guru);
        if (value.foto_pendamping.blob !== undefined) {
            teachData.append('Foto', new Blob([value.foto_pendamping.blob]), value.foto_pendamping.name);
        }
        teachData.append('post_token', teamResponse.data.Post_Token);

        const teacherPost = axios({
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/Teacher/`,
            data: teachData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        //.then((teachRespon) => {console.log(teachRespon);})
        // .catch((error) => {console.log(error)});

        // Wait all post until completed then submit invoice
        return Promise.all([...participantPostArray, teacherPost]).then(()=>{
            //INVOICE
            const invoiceData = new FormData();
            invoiceData.append('post_token', teamResponse.data.Post_Token);
            return axios({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/Invoice/`,
                data: invoiceData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            // .catch((error) => {console.log(error)})
            .then((invoiceResponse) => {
                // console.log(invoiceResponse)
                navigate("/pembayaran", {state: {
                    data: invoiceResponse.data.detail,
                    kode:teamResponse.data.Team_Code,
                    invoice_sum: invoiceResponse.data.invoice_sum
                }});
                return invoiceResponse;
            });
        })
    });
};
export default postData;