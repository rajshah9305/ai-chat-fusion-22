import { Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
}

export function ChatHeader({ onSettingsClick, onMenuClick }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="text-primary-foreground font-bold text-sm">AI</div>
          </div>
          <h1 className="text-lg font-semibold">Chat Everywhere</h1>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onSettingsClick}
      >
        <Settings className="w-5 h-5" />
      </Button>
    </header>
  );
}