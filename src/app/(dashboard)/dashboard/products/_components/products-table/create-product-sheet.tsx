import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CreateProductSheet({
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
          <SheetTitle>Criar Produto</SheetTitle>
          <SheetDescription>
            Insira os detalhes do novo produto.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
