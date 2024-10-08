import express from "express";
import { getJobRoleById, createJobRole, getJobRoles } from "../services/JobRoleService";
import { getBands } from "../services/BandService";
import { getCapabilities } from "../services/CapabilityService";

const baseURL = process.env.AWS_URL || 'http://localhost:3000';

export const getHomePage = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('homepage.html', {baseURL} );
}
 
export const getAllJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRolesList.html', { baseURL, roles: await getJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
}

export const getSingleJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobRoleDetail.html', { baseURL, jobRole: await getJobRoleById(req.params.id, req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobRolesList.html');
    }
}

export const getJobRoleForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobRoleForm.html', { baseURL, bands: await getBands(), capabilities: await getCapabilities() });
}

export const postJobRoleForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = await createJobRole(req.body, req.session.token);
        res.redirect('/jobRoles/' + id);
    } catch (e) {
        res.locals.errormessage = e.message;
        const bands = await getBands();
        const capabilities = await getCapabilities()
        const combinedData = { ...req.body, baseURL, bands, capabilities};
        res.render('jobRoleForm.html', combinedData);
    }
}