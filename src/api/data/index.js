import {apiAxios} from "@/api/rootApi.js";

export const getAllTopics = (data = {}) => {
    return apiAxios({
        method: "get",
        url: "data/topics",
        data,
    });
};

export const getAllCourses = () => {
    return apiAxios({
        method: "get",
        url: "data/courses"
    });
};

export const getAllSkills = (course_id) => {
    return apiAxios({
        method: "get",
        url: `data/courses/${course_id}/skills`
    });
};

export const createSkill = (course_id, data) => {
    return apiAxios({
        method: "post",
        url: `data/courses/${course_id}/skills`,
        data
    });
};

export const getAllLessons = (skill_id) => {
    return apiAxios({
        method: "get",
        url: `data/skills/${skill_id}/lessons`
    });
};

export const createLesson = (skill_id, data) => {
    return apiAxios({
        method: "post",
        url: `data/skills/${skill_id}/lessons`,
        data
    });
};

export const getAllExercises = (lesson_id, dataFilter) => {
    let path = `data/lessons/${lesson_id}/exercises`;
    if (dataFilter && dataFilter.perPage && dataFilter.page) {
        path += `?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;
    }

    return apiAxios({
        method: "get",
        url: path
    });
};

export const createExercise = (lesson_id, data) => {
    return apiAxios({
        method: "post",
        url: `data/lessons/${lesson_id}/exercises`,
        data
    });
};

export const deleteExercise = (exercise_id) => {
    return apiAxios({
        method: "delete",
        url: `data/exercises/${exercise_id}`,
    });
};

