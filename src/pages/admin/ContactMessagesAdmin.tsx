
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Search, Trash2, Check, X, ExternalLink } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContactMessagesAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isViewMessageOpen, setIsViewMessageOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Fetch contact messages
  const { data: messages = [], refetch, isLoading } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contact messages:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Filter messages based on search term and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle message status change
  const handleStatusChange = async (messageId, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', messageId);
      
      if (error) throw error;
      
      refetch();
      toast.success(`Message marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating message status:', error);
      toast.error('Failed to update message status');
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', messageToDelete.id);
      
      if (error) throw error;
      
      refetch();
      toast.success('Message deleted successfully');
      setIsDeleteDialogOpen(false);
      setMessageToDelete(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge variant="default">New</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'replied':
        return <Badge variant="success" className="bg-green-500">Replied</Badge>;
      case 'spam':
        return <Badge variant="destructive">Spam</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout 
      title="Contact Messages" 
      description="View and manage contact form submissions"
      icon={<MessageSquare className="mr-2 h-8 w-8" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="bg-muted py-12 text-center rounded-lg">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No messages found</h3>
            <p className="text-muted-foreground mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? "Try changing your search or filter settings" 
                : "You haven't received any contact form submissions yet"}
            </p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{formatDate(message.created_at)}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setSelectedMessage(message);
                            setIsViewMessageOpen(true);
                            if (message.status === 'new') {
                              handleStatusChange(message.id, 'read');
                            }
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        
                        {message.status !== 'read' && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleStatusChange(message.id, 'read')}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        
                        {message.status !== 'replied' && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleStatusChange(message.id, 'replied')}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span className="sr-only">Mark as replied</span>
                          </Button>
                        )}
                        
                        {message.status !== 'spam' && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleStatusChange(message.id, 'spam')}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Mark as spam</span>
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setMessageToDelete(message);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* View Message Dialog */}
      <Dialog open={isViewMessageOpen} onOpenChange={setIsViewMessageOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              Received on {selectedMessage ? formatDate(selectedMessage.created_at) : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="font-medium">From:</div>
              <div className="col-span-3">{selectedMessage?.name} ({selectedMessage?.email})</div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="font-medium">Message:</div>
              <div className="col-span-3 whitespace-pre-wrap">{selectedMessage?.message}</div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Tabs defaultValue="actions" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="email">Quick Reply</TabsTrigger>
              </TabsList>
              
              <TabsContent value="actions" className="flex flex-wrap justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (selectedMessage) {
                      handleStatusChange(selectedMessage.id, 'read');
                    }
                  }}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Read
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (selectedMessage) {
                      handleStatusChange(selectedMessage.id, 'replied');
                    }
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mark as Replied
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (selectedMessage) {
                      handleStatusChange(selectedMessage.id, 'spam');
                    }
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Mark as Spam
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    setMessageToDelete(selectedMessage);
                    setIsViewMessageOpen(false);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </TabsContent>
              
              <TabsContent value="email">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Quick reply functionality will be implemented in a future update. For now, please use your email client to reply to this message.
                  </p>
                  <div className="flex justify-end">
                    <Button 
                      variant="default"
                      onClick={() => {
                        window.location.href = `mailto:${selectedMessage?.email}?subject=Re: Your message to Asufo Consult`;
                      }}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Open in Email Client
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message from {messageToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ContactMessagesAdmin;
