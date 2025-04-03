import React, { useState, useEffect } from "react";
import { Search, Plus, Upload, Edit, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const KeywordPage = () => {
  const [keywords, setKeywords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKeyword, setEditingKeyword] = useState(null);
  const [editKeywordValue, setEditKeywordValue] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [additionalKeywords, setAdditionalKeywords] = useState([]);

  useEffect(() => {
    const sampleKeywords = [
      "Analytics",
      "Automation",
      "Algorithm",
      "Backend",
      "Cloud Computing",
      "Data Mining",
      "DevOps",
      "Framework",
    ];
    setKeywords(sampleKeywords.sort());
  }, []);

  const filteredKeywords = keywords.filter((keyword) =>
    keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const editKeyword = (keyword) => {
    setEditingKeyword(keyword);
    setEditKeywordValue(keyword);
    setEditDialogOpen(true);
  };

  const saveEditedKeyword = () => {
    if (editKeywordValue && !keywords.includes(editKeywordValue)) {
      setKeywords(
        keywords
          .map((k) => (k === editingKeyword ? editKeywordValue : k))
          .sort()
      );
      setEditDialogOpen(false);
    }
  };

  const deleteKeyword = (keywordToDelete) => {
    setKeywords(keywords.filter((k) => k !== keywordToDelete).sort());
  };

  const addAdditionalKeyword = () => {
    if (newKeyword && !additionalKeywords.includes(newKeyword)) {
      setAdditionalKeywords([...additionalKeywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const removeAdditionalKeyword = (index) => {
    setAdditionalKeywords(additionalKeywords.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // Simulating upload functionality
    const uniqueKeywords = [...new Set([...keywords, ...additionalKeywords])];
    setKeywords(uniqueKeywords.sort());
    setAdditionalKeywords([]);
    setUploadDialogOpen(false);
  };

  return (
    <div className="w-full h-full bg-white text-black p-6">
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl font-semibold text-black mb-6">
          Keyword Management
        </h1>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              className="pl-10 bg-white border-gray-200 text-black"
              placeholder="Search keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Keywords
          </Button>
        </div>

        <Card className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-black">Keywords</h2>
              <span className="text-sm text-gray-500">
                {filteredKeywords.length}{" "}
                {filteredKeywords.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <div className="overflow-auto max-h-[calc(100vh-220px)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-black">Keyword</TableHead>
                  <TableHead className="w-24 text-right text-black">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeywords.length > 0 ? (
                  filteredKeywords.map((keyword, index) => (
                    <TableRow key={index} className="border-t border-gray-200">
                      <TableCell className="text-black">
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-black font-normal"
                        >
                          {keyword}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                            onClick={() => editKeyword(keyword)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                            onClick={() => deleteKeyword(keyword)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="h-32 text-center text-gray-500"
                    >
                      No keywords found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="bg-white text-black sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-black">
              Upload Keywords
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="role" className="text-black">
                Role
              </Label>
              <Select>
                <SelectTrigger
                  id="role"
                  className="bg-white text-black border-gray-200 mt-1"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="action" className="text-black">
                Action
              </Label>
              <Select>
                <SelectTrigger
                  id="action"
                  className="bg-white text-black border-gray-200 mt-1"
                >
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-black">Options</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="option1" />
                  <Label
                    htmlFor="option1"
                    className="text-sm font-normal text-black"
                  >
                    Case sensitive
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="option2" />
                  <Label
                    htmlFor="option2"
                    className="text-sm font-normal text-black"
                  >
                    Auto-categorize
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="option3" />
                  <Label
                    htmlFor="option3"
                    className="text-sm font-normal text-black"
                  >
                    Skip duplicates
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="option4" />
                  <Label
                    htmlFor="option4"
                    className="text-sm font-normal text-black"
                  >
                    Notify users
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="keyword" className="text-black">
                Keyword
              </Label>
              <div className="flex mt-1 gap-2">
                <Input
                  id="keyword"
                  placeholder="Enter keyword"
                  className="bg-white text-black border-gray-200"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addAdditionalKeyword()}
                />
                <Button
                  type="button"
                  size="icon"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={addAdditionalKeyword}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {additionalKeywords.length > 0 && (
              <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
                <Label className="text-sm text-black mb-2 block">
                  Added Keywords
                </Label>
                <div className="flex flex-wrap gap-2">
                  {additionalKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white text-black pr-1 flex items-center gap-1"
                    >
                      {keyword}
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeAdditionalKeyword(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
              className="border-gray-200 text-black hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-xl text-black">
              Edit Keyword
            </DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <Input
              value={editKeywordValue}
              onChange={(e) => setEditKeywordValue(e.target.value)}
              className="bg-white text-black border-gray-200"
              onKeyDown={(e) => e.key === "Enter" && saveEditedKeyword()}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-gray-200 text-black hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={saveEditedKeyword}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KeywordPage;
