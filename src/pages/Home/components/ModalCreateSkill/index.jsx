import React, {useEffect, useState} from 'react'
import {Button, Modal} from "antd";
import InputForm from "@/components/InputForm/index.jsx";
import {createSkill} from "@/api/data/index.js";
import styles from './styles.module.scss'
import {getNotification} from "@/utils/helper.js";

export default function ModalCreateSkill(props) {
    const {
        courseId, visibleCreateSkill,
        setVisibleCreateSkill, handleSuccessCreateSkill
    } = props

    const [name, setName] = useState('')
    const [errorName, setErrorName] = useState('')

    useEffect(() => {
        setName('')
    }, [visibleCreateSkill])

    const handleChangeData = (type, value) => {
        setName(value)
        setErrorName('')
    }

    const handleCreateSkill = () => {
        createSkill(courseId, {name: name}).then((res) => {
            handleSuccessCreateSkill()
            getNotification('success', 'Tạo nhóm thành công.')
        }).catch((error) => {
            if (error.response.data.status === 400) {
                setErrorName(error.response.data.detail.name)
            } else {
                setErrorName(error.response.data.message)
            }
        })
    }

    return(
        <Modal
            className={`general-dialog-wrap`}
            closable={false}
            footer={false}
            open={visibleCreateSkill}
            onOk={() => setVisibleCreateSkill(!visibleCreateSkill)}
            onCancel={() => setVisibleCreateSkill(!visibleCreateSkill)}
            width={700}
        >
            <div className={styles.headerWrap}>
                Tạo nhóm
            </div>
            <InputForm
                label={'Tên nhóm'}
                placeholder={'Nhập câu hỏi'}
                required={true}
                type="name"
                value={name}
                error={errorName}
                handleChangeData={handleChangeData}
            />

            <div className={styles.btnWrap}>
                <Button
                    className={styles.btnConfirm}
                    onClick={() => handleCreateSkill()}
                >Tạo nhóm
                </Button>
            </div>
        </Modal>
    )
}
