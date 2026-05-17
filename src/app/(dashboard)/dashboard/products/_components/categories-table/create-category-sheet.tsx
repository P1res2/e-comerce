import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CreateCategorySheet({
  isCreateSheetOpen,
  setIsCreateSheetOpen,
}: {
  isCreateSheetOpen: boolean;
  setIsCreateSheetOpen: (open: boolean) => void;
}) {
  return (
    <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
      <SheetContent className="min-w-[30vw]">
        <SheetHeader>
          <SheetTitle>Criar Categoria</SheetTitle>
          <SheetDescription>Insira os detalhes da nova categoria.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
