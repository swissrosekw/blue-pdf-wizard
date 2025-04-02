
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "PDFlex Tools",
    siteDescription: "All-in-one PDF tools",
    supportEmail: "support@pdflex-tools.com",
    maxFileSize: "100",
    enableGuestUploads: true,
    enableAnalytics: true,
    maintenanceMode: false
  });
  
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "PDFlex Tools - Free PDF Tools Online",
    metaDescription: "Edit, compress, convert, merge and split PDF files online with our free PDF tools. No registration required.",
    keywords: "pdf tools, pdf editor, compress pdf, merge pdf, split pdf, convert pdf",
    ogImage: "/images/social-cover.jpg",
    googleVerification: "",
    bingVerification: ""
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    googleAnalyticsId: "UA-XXXXXXXXX-X",
    mailchimpApiKey: "",
    recaptchaSiteKey: "",
    cloudflareApiKey: ""
  });
  
  const handleGeneralChange = (field: string, value: string | boolean) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value
    });
  };
  
  const handleSeoChange = (field: string, value: string) => {
    setSeoSettings({
      ...seoSettings,
      [field]: value
    });
  };
  
  const handleIntegrationChange = (field: string, value: string) => {
    setIntegrationSettings({
      ...integrationSettings,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Site Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
          <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage the basic configuration of your site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    value={generalSettings.siteName}
                    onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input 
                    id="supportEmail" 
                    type="email" 
                    value={generalSettings.supportEmail}
                    onChange={(e) => handleGeneralChange('supportEmail', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea 
                  id="siteDescription" 
                  rows={3}
                  value={generalSettings.siteDescription}
                  onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                <Input 
                  id="maxFileSize" 
                  type="number" 
                  value={generalSettings.maxFileSize}
                  onChange={(e) => handleGeneralChange('maxFileSize', e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Features</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Allow Guest Uploads</h4>
                    <p className="text-sm text-muted-foreground">Allow users to upload files without registration</p>
                  </div>
                  <Switch 
                    checked={generalSettings.enableGuestUploads}
                    onCheckedChange={(checked) => handleGeneralChange('enableGuestUploads', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Analytics</h4>
                    <p className="text-sm text-muted-foreground">Track user behavior and site usage</p>
                  </div>
                  <Switch 
                    checked={generalSettings.enableAnalytics}
                    onCheckedChange={(checked) => handleGeneralChange('enableAnalytics', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-muted-foreground">Put the site in maintenance mode (only admins can access)</p>
                  </div>
                  <Switch 
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => handleGeneralChange('maintenanceMode', checked)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO & Metadata</CardTitle>
              <CardDescription>
                Configure your site's search engine optimization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input 
                  id="metaTitle" 
                  value={seoSettings.metaTitle}
                  onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea 
                  id="metaDescription" 
                  rows={3}
                  value={seoSettings.metaDescription}
                  onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Textarea 
                  id="keywords" 
                  rows={2}
                  value={seoSettings.keywords}
                  onChange={(e) => handleSeoChange('keywords', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ogImage">Social Image URL</Label>
                <Input 
                  id="ogImage" 
                  value={seoSettings.ogImage}
                  onChange={(e) => handleSeoChange('ogImage', e.target.value)}
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="googleVerification">Google Verification</Label>
                  <Input 
                    id="googleVerification" 
                    value={seoSettings.googleVerification}
                    onChange={(e) => handleSeoChange('googleVerification', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bingVerification">Bing Verification</Label>
                  <Input 
                    id="bingVerification" 
                    value={seoSettings.bingVerification}
                    onChange={(e) => handleSeoChange('bingVerification', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect your site with third-party services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input 
                  id="googleAnalyticsId" 
                  value={integrationSettings.googleAnalyticsId}
                  onChange={(e) => handleIntegrationChange('googleAnalyticsId', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mailchimpApiKey">Mailchimp API Key</Label>
                <Input 
                  id="mailchimpApiKey" 
                  type="password"
                  value={integrationSettings.mailchimpApiKey}
                  onChange={(e) => handleIntegrationChange('mailchimpApiKey', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recaptchaSiteKey">reCAPTCHA Site Key</Label>
                <Input 
                  id="recaptchaSiteKey" 
                  value={integrationSettings.recaptchaSiteKey}
                  onChange={(e) => handleIntegrationChange('recaptchaSiteKey', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cloudflareApiKey">Cloudflare API Key</Label>
                <Input 
                  id="cloudflareApiKey" 
                  type="password"
                  value={integrationSettings.cloudflareApiKey}
                  onChange={(e) => handleIntegrationChange('cloudflareApiKey', e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
              <CardDescription>
                Manage database backups and system recovery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-lightSalt p-4 rounded-md border">
                  <h3 className="font-medium mb-2">Scheduled Backups</h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">Enable automatic daily backups</p>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="backupTime">Backup Time</Label>
                      <Input id="backupTime" type="time" defaultValue="03:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retentionDays">Retention (days)</Label>
                      <Input id="retentionDays" type="number" defaultValue="14" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Manual Backup</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-normal">Database</Label>
                      </div>
                      <Button variant="outline" size="sm">
                        Create Backup
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-normal">Files & Configurations</Label>
                      </div>
                      <Button variant="outline" size="sm">
                        Create Backup
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-normal">Complete System</Label>
                      </div>
                      <Button size="sm">
                        Create Full Backup
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Recent Backups</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 text-sm font-medium">Filename</th>
                        <th className="text-left py-2 px-2 text-sm font-medium">Date</th>
                        <th className="text-left py-2 px-2 text-sm font-medium">Size</th>
                        <th className="text-right py-2 px-2 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-2 text-sm">backup-2023-10-15.zip</td>
                        <td className="py-2 px-2 text-sm">Oct 15, 2023</td>
                        <td className="py-2 px-2 text-sm">24.5 MB</td>
                        <td className="py-2 px-2 text-sm text-right">
                          <Button variant="ghost" size="sm">Download</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-2 text-sm">backup-2023-10-14.zip</td>
                        <td className="py-2 px-2 text-sm">Oct 14, 2023</td>
                        <td className="py-2 px-2 text-sm">24.3 MB</td>
                        <td className="py-2 px-2 text-sm text-right">
                          <Button variant="ghost" size="sm">Download</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 text-sm">backup-2023-10-13.zip</td>
                        <td className="py-2 px-2 text-sm">Oct 13, 2023</td>
                        <td className="py-2 px-2 text-sm">24.2 MB</td>
                        <td className="py-2 px-2 text-sm text-right">
                          <Button variant="ghost" size="sm">Download</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
