import { Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import { SensorDataCard } from "../SensorDataCard";
import { SensorDataProvider, useSensorData } from "../SensorDataContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableSensorCard = ({ id, value, valMin, valMax, name }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SensorDataCard 
        value={value} 
        valMin={valMin} 
        valMax={valMax} 
        name={name} 
      />
    </div>
  );
};

export const MainContentPaper: React.FC = () => {
    const { sensorData } = useSensorData();
    
    const [sensorCards, setSensorCards] = useState([
        {
            id: "humidity",
            name: "Humidity",
            getValue: () => sensorData?.humidity.data.relHum ?? 0,
            valMax: 100,
            valMin: 0
        },
        {
            id: "temperature",
            name: "Temperature",
            getValue: () => sensorData?.temp.data.temp ?? 0,
            valMax: 40,
            valMin: 20
        },
        {
            id: "soil",
            name: "Soil humidty",
            getValue: () => sensorData?.soil.data.soilHumidity ?? 0,
            valMax: 100,
            valMin: 0
        }
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            setSensorCards((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div>
            <Paper elevation={3}>
                <DndContext 
                    sensors={sensors} 
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext 
                        items={sensorCards.map(card => card.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <Stack
                            direction="row"
                            spacing={4}
                            justifySelf="center"
                            width="100%"
                            sx={{ padding: 2 }}
                        >
                            {sensorCards.map((card) => (
                                <SortableSensorCard
                                    key={card.id}
                                    id={card.id}
                                    value={card.getValue()}
                                    valMax={card.valMax}
                                    valMin={card.valMin}
                                    name={card.name}
                                />
                            ))}
                        </Stack>
                    </SortableContext>
                </DndContext>
            </Paper>
        </div>
    );
};