import React from "react";
import styles from './styles.module.scss';
import Handle from './handle.js';
import MainLayout from "../../layouts/MainLayout/index.jsx";
import {Button,Select, Table} from "antd";
import './styles.scss';
import ModalCreateExercise from "@/pages/Home/components/ModalCreateExercise/index.jsx";
import ModalCreateSkill from "@/pages/Home/components/ModalCreateSkill/index.jsx";
import {ModalCreateLesson} from "@/pages/Home/components/ModalCreateLesson";

export default function Home() {
    const {
        courseId, columns, skills, lessons, selectSkill, selectLesson, exercises, formExercise, topics,
        loadingSkill, loadingLesson, loadingExercise, paginationConfig, loadingCreateExercise,
        visibleCreateExercise, setVisibleCreateExercise, propsCreateFile,
        visibleCreateSkill, setVisibleCreateSkill,
        visibleCreateLesson, setVisibleCreateLesson,
        onChangeSkill, onChangeLesson,
        handleChangeSelect, handleChangePromptData, handleCreateExercise,
        handleChangeCorrectAnswersTypeMatch, handleDeleteItemAnswerTypeMatch, handleCreateItemAnswerTypeMatch,
        handleSuccessCreateSkill, handleSuccessCreateLesson, handleChangePagination,
        handleAddTextAnswerTypeFill, handleChangePromptValueQuestionTypeFill, handleChangeImageChoices,
        handleCreateItemChooseImage, handleDeleteItemChooseImage
    } = Handle();

    return (
        <MainLayout>
            <div className={styles.homeContainer}>

                <div className={styles.mainContentWrap}>
                    <div className={styles.filterWrapGroup}>
                        <div className={styles.filterWrap}>

                            <div className={`input-wrap ${styles.boxPromptWrap}`}>
                                <div className={"label-wrap"}>
                                    Nhóm buổi học
                                </div>

                                <Select
                                    className={`main-select`}
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Chọn nhóm buổi học"
                                    optionFilterProp="label"
                                    value={selectSkill}
                                    onChange={onChangeSkill}
                                    disabled={loadingSkill}
                                    loading={loadingSkill}
                                    options={skills ? skills.map(item => ({
                                        value: item._id,
                                        label: `${item.name}`,
                                    })) : []}
                                />
                            </div>

                            <div className={`input-wrap ${styles.boxPromptWrap}`}>
                                <div className={"label-wrap"}>
                                    Buổi học
                                </div>

                                <Select
                                    className={`main-select`}
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Chọn buổi học"
                                    optionFilterProp="label"
                                    onChange={onChangeLesson}
                                    value={selectLesson}
                                    disabled={loadingLesson || loadingSkill}
                                    loading={loadingLesson || loadingSkill}
                                    options={lessons ? lessons.map(item => ({
                                        value: item._id,
                                        label: `${item.name}`,
                                    })) : []}
                                />
                            </div>

                        </div>

                        <div className={styles.createGroupWrap}>
                            <Button
                                disabled={!courseId}
                                className={styles.btnCreateSkill}
                                onClick={() => setVisibleCreateSkill(true)}
                            >Tạo nhóm buổi học
                            </Button>
                            <Button
                                disabled={!selectSkill}
                                onClick={() => setVisibleCreateLesson(true)}
                                className={styles.btnCreateLesson}
                            >Tạo buổi học
                            </Button>
                            <Button
                                disabled={!selectSkill || !selectLesson}
                                className={styles.btnCreateExercise}
                                onClick={() => setVisibleCreateExercise(true)}
                            >Tạo bài tập
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Table
                            loading={loadingExercise}
                            columns={columns}
                            dataSource={exercises}
                            pagination={paginationConfig}
                            onChange={handleChangePagination}
                            rowKey={'_id'}
                        />
                    </div>
                </div>
            </div>

            <ModalCreateExercise
                formExercise={formExercise}
                loadingCreateExercise={loadingCreateExercise}
                visibleCreateExercise={visibleCreateExercise}
                propsCreateFile={propsCreateFile}
                setVisibleCreateExercise={setVisibleCreateExercise}
                handleChangeSelect={handleChangeSelect}
                handleChangePromptData={handleChangePromptData}
                handleCreateItemAnswerTypeMatch={handleCreateItemAnswerTypeMatch}
                handleChangeCorrectAnswersTypeMatch={handleChangeCorrectAnswersTypeMatch}
                handleDeleteItemAnswerTypeMatch={handleDeleteItemAnswerTypeMatch}
                handleCreateExercise={handleCreateExercise}
                handleAddTextAnswerTypeFill={handleAddTextAnswerTypeFill}
                handleChangePromptValueQuestionTypeFill={handleChangePromptValueQuestionTypeFill}
                handleChangeImageChoices={handleChangeImageChoices}
                handleCreateItemChooseImage={handleCreateItemChooseImage}
                handleDeleteItemChooseImage={handleDeleteItemChooseImage}
            />

            <ModalCreateSkill
                courseId={courseId}
                visibleCreateSkill={visibleCreateSkill}
                setVisibleCreateSkill={setVisibleCreateSkill}
                handleSuccessCreateSkill={handleSuccessCreateSkill}
            />

            <ModalCreateLesson
                skillId={selectSkill}
                topics={topics}
                visibleCreateLesson={visibleCreateLesson}
                setVisibleCreateLesson={setVisibleCreateLesson}
                handleSuccessCreateLesson={handleSuccessCreateLesson}
            />
        </MainLayout>
    )
}
