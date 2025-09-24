import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface SurveyData {
  id: string;
  farmerName: string;
  village: string;
  educationQualification: string;
  educationalStatusHousehold: string;
  familyMembers: number;
  householdIncome: string;
  farmingMethods: string;
  landArea: string; // Changed from number to string
  farmActivities: string;
  cultivationResources: string;
  technologyUse: string;
  scientificMethod: string;
  submittedAt: string;
}

export const SurveyForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<SurveyData, 'id' | 'submittedAt'>>({
    farmerName: '',
    village: '',
    educationQualification: '',
    educationalStatusHousehold: '',
    familyMembers: 0,
    householdIncome: '',
    farmingMethods: '',
    landArea: '', // Changed from 0 to ''
    farmActivities: '',
    cultivationResources: '',
    technologyUse: '',
    scientificMethod: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('farmer_surveys')
        .insert({
          farmer_name: formData.farmerName,
          village: formData.village,
          education_qualification: formData.educationQualification,
          educational_status_household: formData.educationalStatusHousehold,
          family_members: formData.familyMembers,
          household_income: formData.householdIncome,
          farming_methods: formData.farmingMethods,
          land_area: formData.landArea, // Now a string
          farm_activities: formData.farmActivities,
          cultivation_resources: formData.cultivationResources,
          technology_use: formData.technologyUse,
          scientific_method: formData.scientificMethod,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Survey Submitted Successfully!",
        description: `Thank you ${formData.farmerName}, your response has been recorded.`,
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast({
        title: "Error Submitting Survey",
        description: "There was an error saving your response. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Reset form
    setFormData({
      farmerName: '',
      village: '',
      educationQualification: '',
      educationalStatusHousehold: '',
      familyMembers: 0,
      householdIncome: '',
      farmingMethods: '',
      landArea: '', // Reset as empty string
      farmActivities: '',
      cultivationResources: '',
      technologyUse: '',
      scientificMethod: '',
    });
  };

  const incomeRanges = [
    "Below ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,00,000",
    "₹2,00,000 - ₹5,00,000",
    "Above ₹5,00,000"
  ];

  const educationLevels = [
    "No formal education",
    "Primary education",
    "Secondary education",
    "Higher secondary",
    "Graduate",
    "Post graduate"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-medium border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary to-success rounded-t-lg text-primary-foreground">
            <CardTitle className="text-2xl font-bold">Farmer Survey Form</CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Help us understand farming practices in your region
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farmerName">Farmer Name *</Label>
                <Input
                  id="farmerName"
                  type="text"
                  required
                  value={formData.farmerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="village">Village *</Label>
                <Input
                  id="village"
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Qualification *</Label>
                <Select
                  required
                  value={formData.educationQualification}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, educationQualification: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="educationalStatusHousehold">Educational Status of Household Members *</Label>
                <Textarea
                  id="educationalStatusHousehold"
                  required
                  placeholder="e.g., spouse: graduate, children: primary school"
                  value={formData.educationalStatusHousehold}
                  onChange={(e) => setFormData(prev => ({ ...prev, educationalStatusHousehold: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="familyMembers">Family Members (Number) *</Label>
                  <Input
                    id="familyMembers"
                    type="number"
                    min="1"
                    required
                    value={formData.familyMembers || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, familyMembers: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landArea">Land Area (in Bigha or "No land") *</Label>
                  <Input
                    id="landArea"
                    type="text" // changed from "number"
                    required
                    value={formData.landArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, landArea: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">Household Annual Income *</Label>
                <Select
                  required
                  value={formData.householdIncome}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, householdIncome: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingMethods">Farming Methods *</Label>
                <Textarea
                  id="farmingMethods"
                  required
                  placeholder="e.g., organic, traditional, modern techniques"
                  value={formData.farmingMethods}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmingMethods: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmActivities">Type of Farm Activities *</Label>
                <Textarea
                  id="farmActivities"
                  required
                  placeholder="e.g., crop farming, livestock, poultry"
                  value={formData.farmActivities}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmActivities: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cultivationResources">Resources for Cultivation *</Label>
                <Textarea
                  id="cultivationResources"
                  required
                  placeholder="e.g., tractors, irrigation systems"
                  value={formData.cultivationResources}
                  onChange={(e) => setFormData(prev => ({ ...prev, cultivationResources: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologyUse">Use of Technology *</Label>
                <Textarea
                  id="technologyUse"
                  required
                  placeholder="e.g., mobile apps, drones"
                  value={formData.technologyUse}
                  onChange={(e) => setFormData(prev => ({ ...prev, technologyUse: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scientificMethod">Use of Scientific Methods *</Label>
                <Textarea
                  id="scientificMethod"
                  required
                  placeholder="e.g., soil testing, crop rotation"
                  value={formData.scientificMethod}
                  onChange={(e) => setFormData(prev => ({ ...prev, scientificMethod: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full text-lg py-6">
                Submit Survey
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
