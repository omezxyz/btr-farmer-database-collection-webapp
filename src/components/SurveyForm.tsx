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
  landArea: number;
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
    landArea: 0,
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
          land_area: formData.landArea,
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
      landArea: 0,
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
                <Label htmlFor="farmerName" className="text-foreground font-medium">
                  Farmer Name *
                </Label>
                <Input
                  id="farmerName"
                  type="text"
                  required
                  className="border-primary/20 focus:border-primary"
                  value={formData.farmerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="village" className="text-foreground font-medium">
                  Village *
                </Label>
                <Input
                  id="village"
                  type="text"
                  required
                  className="border-primary/20 focus:border-primary"
                  value={formData.village}
                  onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="text-foreground font-medium">
                  Education Qualification *
                </Label>
                <Select
                  required
                  value={formData.educationQualification}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, educationQualification: value }))}
                >
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="educationalStatusHousehold" className="text-foreground font-medium">
                  Educational Status of Household Members *
                </Label>
                <Textarea
                  id="educationalStatusHousehold"
                  required
                  className="border-primary/20 focus:border-primary min-h-20"
                  placeholder="Describe education levels of all household members (e.g., spouse: graduate, children: primary school)"
                  value={formData.educationalStatusHousehold}
                  onChange={(e) => setFormData(prev => ({ ...prev, educationalStatusHousehold: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="familyMembers" className="text-foreground font-medium">
                    Family Members (Number) *
                  </Label>
                  <Input
                    id="familyMembers"
                    type="number"
                    min="1"
                    required
                    className="border-primary/20 focus:border-primary"
                    value={formData.familyMembers || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, familyMembers: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landArea" className="text-foreground font-medium">
                    Land Area (in Bigha) *
                  </Label>
                  <Input
                    id="landArea"
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    className="border-primary/20 focus:border-primary"
                    value={formData.landArea || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, landArea: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income" className="text-foreground font-medium">
                  Household Annual Income *
                </Label>
                <Select
                  required
                  value={formData.householdIncome}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, householdIncome: value }))}
                >
                  <SelectTrigger className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingMethods" className="text-foreground font-medium">
                  Farming Methods *
                </Label>
                <Textarea
                  id="farmingMethods"
                  required
                  className="border-primary/20 focus:border-primary min-h-20"
                  placeholder="Describe your farming methods (e.g., organic, traditional, modern techniques)"
                  value={formData.farmingMethods}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmingMethods: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmActivities" className="text-foreground font-medium">
                  Type of Farm Activities *
                </Label>
                <Textarea
                  id="farmActivities"
                  required
                  className="border-primary/20 focus:border-primary min-h-20"
                  placeholder="e.g., crop farming, livestock, poultry, dairy, horticulture"
                  value={formData.farmActivities}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmActivities: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cultivationResources" className="text-foreground font-medium">
                  Resources for Cultivation *
                </Label>
                <Textarea
                  id="cultivationResources"
                  required
                  className="border-primary/20 focus:border-primary min-h-20"
                  placeholder="e.g., tractors, irrigation systems, seeds, fertilizers, labor"
                  value={formData.cultivationResources}
                  onChange={(e) => setFormData(prev => ({ ...prev, cultivationResources: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologyUse" className="text-foreground font-medium">
                  Use of Technology *
                </Label>
                <Textarea
                  id="technologyUse"
                  required
                  className="border-primary/20 focus:border-primary min-h-20"
                  placeholder="Describe technology usage (e.g., mobile apps, GPS, drones, sensors)"
                  value={formData.technologyUse}
                  onChange={(e) => setFormData(prev => ({ ...prev, technologyUse: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scientificMethod" className="text-foreground font-medium">
                  Use of Scientific Methods *
                </Label>
                <Textarea
                  id="scientificMethod"
                  required
                  className="border-primary/20 focus:border-primary min-h-20"
                  placeholder="Describe scientific methods used (e.g., soil testing, weather monitoring, crop rotation)"
                  value={formData.scientificMethod}
                  onChange={(e) => setFormData(prev => ({ ...prev, scientificMethod: e.target.value }))}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-lg py-6"
              >
                Submit Survey
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};