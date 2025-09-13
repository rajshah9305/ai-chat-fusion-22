import { useState } from 'react';
import { X, Key, Check, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AI_PROVIDERS } from '@/constants/providers';
import { APIKey } from '@/types/chat';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  apiKeys: APIKey[];
  onSaveApiKey: (provider: string, key: string) => void;
  onRemoveApiKey: (provider: string) => void;
}

export function SettingsModal({
  open,
  onClose,
  apiKeys,
  onSaveApiKey,
  onRemoveApiKey,
}: SettingsModalProps) {
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState('');

  const handleSaveKey = () => {
    if (editingProvider && keyInput.trim()) {
      onSaveApiKey(editingProvider, keyInput.trim());
      setEditingProvider(null);
      setKeyInput('');
    }
  };

  const handleEditKey = (provider: string) => {
    const existingKey = apiKeys.find(k => k.provider === provider);
    setEditingProvider(provider);
    setKeyInput(existingKey?.key || '');
  };

  const getKeyStatus = (provider: string) => {
    const key = apiKeys.find(k => k.provider === provider);
    if (!key) return 'missing';
    return key.isValid !== false ? 'valid' : 'invalid';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="api-keys" className="w-full">
          <TabsList>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Configure your API keys for different AI providers. Keys are stored locally in your browser.
            </div>

            <div className="space-y-4">
              {AI_PROVIDERS.map((provider) => {
                const status = getKeyStatus(provider.id);
                const isEditing = editingProvider === provider.id;

                return (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {provider.models.slice(0, 2).join(', ')}
                          {provider.models.length > 2 && ` +${provider.models.length - 2} more`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={status === 'valid' ? 'default' : status === 'invalid' ? 'destructive' : 'secondary'}
                      >
                        {status === 'valid' && <Check className="w-3 h-3 mr-1" />}
                        {status === 'invalid' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {status === 'valid' ? 'Connected' : status === 'invalid' ? 'Invalid' : 'Not Set'}
                      </Badge>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditKey(provider.id)}
                      >
                        {status === 'missing' ? 'Add Key' : 'Edit'}
                      </Button>

                      {status !== 'missing' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveApiKey(provider.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {editingProvider && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <Label htmlFor="api-key">
                  API Key for {AI_PROVIDERS.find(p => p.id === editingProvider)?.name}
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="api-key"
                    type="password"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="Enter your API key..."
                  />
                  <Button onClick={handleSaveKey}>Save</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingProvider(null);
                      setKeyInput('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              General application settings.
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">More settings coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}