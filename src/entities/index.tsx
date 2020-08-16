import Square from './Square'

export interface EntityMenuItem {
    name: string,
    component: any
}

export interface EntityMenuGroup {
    group: string,
    children: EntityMenuItem[]
}

export const ENTITIES_MENU:EntityMenuGroup[] = [
    {
        "group": "Shapes",
        "children": 
        [
            {
                "name": "Square",
                "component": Square
            },
            {
                "name": "Circle",
                "component": Square
            },
        ]
    },
    {
        "group": "Volumes",
        "children": 
        [
            {
                "name": "Cube",
                "component": Square
            },
            {
                "name": "Piramide",
                "component": Square
            },
        ]
    },
];