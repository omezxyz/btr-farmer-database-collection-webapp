import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Users } from "lucide-react";
import { SurveyData } from "./SurveyForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const SurveyResponses = () => {
  const { toast } = useToast();
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyData | null>(
    null
  );

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const { data, error } = await supabase
          .from("farmer_surveys")
          .select("*")
          .order("submitted_at", { ascending: false });

        if (error) throw error;

        const transformedData: SurveyData[] = data.map((survey) => ({
          id: survey.id,
          farmerName: survey.farmer_name,
          village: survey.village,
          educationQualification: survey.education_qualification,
          educationalStatusHousehold: survey.educational_status_household,
          familyMembers: survey.family_members,
          householdIncome: survey.household_income,
          farmingMethods: survey.farming_methods,
          landArea: survey.land_area,
          farmActivities: survey.farm_activities,
          cultivationResources: survey.cultivation_resources,
          technologyUse: survey.technology_use,
          scientificMethod: survey.scientific_method,
          submittedAt: survey.submitted_at,
        }));

        setSurveys(transformedData);
      } catch (error) {
        console.error("Error fetching surveys:", error);
        toast({
          title: "Error Loading Data",
          description: "There was an error loading the survey responses.",
          variant: "destructive",
        });
      }
    };

    fetchSurveys();
  }, [toast]);

  const exportToExcel = () => {
    if (surveys.length === 0) {
      toast({
        title: "No Data to Export",
        description: "Please collect some survey responses first.",
        variant: "destructive",
      });
      return;
    }

    const excelData = surveys.map((survey) => ({
      "Farmer Name": survey.farmerName,
      "Education Qualification": survey.educationQualification,
      "Educational Status (HH)": survey.educationalStatusHousehold,
      "Family Members": survey.familyMembers,
      "Household Income": survey.householdIncome,
      "Farming Methods": survey.farmingMethods,
      "Land Area (Bigha)": survey.landArea,
      "Farm Activities": survey.farmActivities,
      "Cultivation Resources": survey.cultivationResources,
      "Technology Use": survey.technologyUse,
      "Scientific Method": survey.scientificMethod,
      "Submitted At": new Date(survey.submittedAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData, { cellDates: true });

    const maxLengths =
      excelData.length > 0
        ? Object.keys(excelData[0]).map((key) => ({
            wch: Math.max(
              key.length,
              ...excelData.map((row) =>
                row[key] ? row[key].toString().length : 0
              )
            ),
          }))
        : [];

    worksheet["!cols"] = maxLengths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Survey Responses");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      blob,
      `farmer_survey_responses_${new Date().toISOString().split("T")[0]}.xlsx`
    );

    toast({
      title: "Export Successful!",
      description: `Exported ${surveys.length} survey responses to Excel.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-medium border-0 mb-6">
          <CardHeader className="bg-gradient-to-r from-primary to-success rounded-t-lg text-primary-foreground">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Survey Responses
                  </CardTitle>
                  <p className="text-primary-foreground/90">
                    {surveys.length} responses collected
                  </p>
                </div>
              </div>
              <Button
                onClick={exportToExcel}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-0 w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {surveys.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Responses Yet
                </h3>
                <p className="text-muted-foreground">
                  Survey responses will appear here once submitted.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-full text-sm">
                  <TableHeader>
                    <TableRow className="border-b border-primary/10">
                      <TableHead className="font-semibold whitespace-nowrap">
                        Farmer Name
                      </TableHead>
                      <TableHead className="font-semibold whitespace-nowrap">
                        Education
                      </TableHead>
                      <TableHead className="font-semibold whitespace-nowrap">
                        Family Size
                      </TableHead>
                      <TableHead className="font-semibold whitespace-nowrap">
                        Income Range
                      </TableHead>
                      <TableHead className="font-semibold whitespace-nowrap">
                        Land Area
                      </TableHead>
                      <TableHead className="font-semibold whitespace-nowrap">
                        Date Submitted
                      </TableHead>
                      <TableHead className="font-semibold whitespace-nowrap">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surveys.map((survey) => (
                      <TableRow
                        key={survey.id}
                        className="hover:bg-accent/30"
                      >
                        <TableCell className="font-medium">
                          {survey.farmerName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-accent break-words"
                          >
                            {survey.educationQualification}
                          </Badge>
                        </TableCell>
                        <TableCell>{survey.familyMembers}</TableCell>
                        <TableCell>{survey.householdIncome}</TableCell>
                        <TableCell>{survey.landArea} Bigha</TableCell>
                        <TableCell>
                          {new Date(survey.submittedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSurvey(survey)}
                            className="border-primary/20 hover:bg-primary/10"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Responsive Detail View */}
        {selectedSurvey && (
          <Card className="shadow-medium border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-success rounded-t-lg text-primary-foreground">
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
                <CardTitle className="text-xl font-bold">
                  Survey Details - {selectedSurvey.farmerName}
                </CardTitle>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedSurvey(null)}
                  className="bg-white/20 hover:bg-white/30 text-primary-foreground border-0 w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Personal Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedSurvey.farmerName}
                      </p>
                      <p>
                        <span className="font-medium">Village:</span>{" "}
                        {selectedSurvey.village}
                      </p>
                      <p>
                        <span className="font-medium">Education:</span>{" "}
                        {selectedSurvey.educationQualification}
                      </p>
                      <p>
                        <span className="font-medium">Family Members:</span>{" "}
                        {selectedSurvey.familyMembers}
                      </p>
                      <p>
                        <span className="font-medium">Annual Income:</span>{" "}
                        {selectedSurvey.householdIncome}
                      </p>
                      <p>
                        <span className="font-medium">Land Area:</span>{" "}
                        {selectedSurvey.landArea} Bigha
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Farm Activities
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedSurvey.farmActivities}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Cultivation Resources
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedSurvey.cultivationResources}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Farming Methods
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedSurvey.farmingMethods}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Technology Usage
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedSurvey.technologyUse}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Scientific Methods
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedSurvey.scientificMethod}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Submission Date
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        selectedSurvey.submittedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
