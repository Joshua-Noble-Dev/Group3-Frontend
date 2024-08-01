import { ViewJobRolesTestsPage } from './ViewJobRolesTestsPage';
import { HeaderTestPage } from './HeaderTestPage';
import { FooterTestPage } from './FooterTestPage';
import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('View Job Roles Tests', function () {
    this.timeout(70000);
    const page:string = 'https://jptw3amsi2.eu-west-1.awsapprunner.com/jobRoles';

    before(async function () {
        await ViewJobRolesTestsPage.startDriver();
        FooterTestPage.driver = ViewJobRolesTestsPage.getDriver(); // the footer test uses the same driver
        HeaderTestPage.driver = ViewJobRolesTestsPage.getDriver(); // the header test uses the same driver
    });

    after(async function () {
        await ViewJobRolesTestsPage.quitDriver();
    });

    it('Job roles page should load', async function () {
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertJobRolesTitle();
    });

    it('Footer links should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(page);
            await FooterTestPage.clickLink("facebook");
            await FooterTestPage.assertAndGoBack('facebook.com/KainosSoftware', page);
            await FooterTestPage.clickLink("twitter");
            await FooterTestPage.assertAndGoBack('x.com', page);
            await FooterTestPage.clickLink("instagram")
            await FooterTestPage.assertAndGoBack('instagram.com', page);
            await ViewJobRolesTestsPage.assertJobRolesTitle();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    it('Job status should always be open', async function () {
        await ViewJobRolesTestsPage.loadPage(page);
        await ViewJobRolesTestsPage.assertJobStatusOpen();
    });

    it.only('Header buttons should work', async function () {
        try {
            await ViewJobRolesTestsPage.loadPage(page);
            await HeaderTestPage.clickButton('navbarHome', 'home');

                const homepageimg =  this.driver.findElement(By.xpath("//img[@id='homepageBackgroundImage']"));
            
 // Wait for the image to be located
 await ViewJobRolesTestsPage.driver.wait(until.elementLocated(homepageimg), 10000);
        
 // Find the image element
 const imageElement = await ViewJobRolesTestsPage.driver.findElement(homepageimg);
 
 // Ensure the image is displayed
 const isDisplayed = await imageElement.isDisplayed();
 
 // Log and assert the image is displayed
 console.log('Image is displayed:', isDisplayed);
 expect(isDisplayed).to.be.true;

            //await ViewJobRolesTestsPage.assertHomePageImg();
            // await ViewJobRolesTestsPage.loadPage(page);
            // await ViewJobRolesTestsPage.assertJobRolesTitle();

            // await HeaderTestPage.clickButton('navbarJobs', 'job roles');
            // await ViewJobRolesTestsPage.assertJobRolesTitle();
        
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    });

    

});
